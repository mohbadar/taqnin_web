import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { DatatablesService } from 'app/_services/datatables.service'
import { DataTableColumn } from 'app/_models/datatable-column';
import { OrderService } from './order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { Globals } from 'app/_helpers/globals';
import { HistoryOrderComponent } from './components/history-order/history-order.component';
import { DateConvertService } from 'app/services/date-convert.service';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { DateAdapter } from 'angular-calendar';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss', '/assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
	@ViewChild('tableRowDetails') tableRowDetails: any;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
    tableOptions;
    tblMsgs;
    columns;
    dataLoadingFlag: boolean;
    rows: any[];
    recordsTotal: number;
    toBeDeletedRecordId: any;
    successMsg: any;
    pageLengths;
    cssClasses;

    filterForm: FormGroup;
    viewRecordInModal: any = true;
    isCollapsed: boolean = false;
    showFilterForm: boolean;

	  filters;
	  level = null;
	
	  loading = false;
   
    orderDocumentTypes$;
    
    constructor(
      private cdref: ChangeDetectorRef, public translate: TranslateService, 
      private spinner:NgxSpinnerService,
      private modalService: NgbModal,
      private router: Router,
      private fb: FormBuilder, 
      public globals: Globals,
      public toastr: ToastrService,
      private dConvert: DateConvertService,
      private dtService: DatatablesService,
      private sysRegService: SystemRegistryService, private orderService: OrderService

    ) { }

    ngOnInit(): void {
      this.filters = null;
		  this.pageLengths = this.dtService.pageLengths;
		  this.cssClasses = this.dtService.cssClasses;
      this.tblMsgs = this.dtService.getTableMsgs();
		
		  this.tableOptions = this.testTableOptions();
		  this.columns = this.dtService.getColumnsArray(this.tableOptions);
		  this.createFilterForm();
		  this.renderData(this.tableOptions);
        
    }


    renderData(tableOptions) {
      // the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
      this.dataLoadingFlag = true;
      this.spinner.show();
      this.orderService.getRecordList(tableOptions, this.filters).subscribe((data:any) => {
        if (data == null) {
          this.rows = [];
          this.recordsTotal = 0;
        } else {
          console.log("data from server ", data.data);
          console.log(data);
  
          this.rows = this.dtService.parseDatatableData(this, tableOptions, data.data);
          this.recordsTotal = data.recordsTotal;
        }
        this.spinner.hide();
        this.cdref.detectChanges();
        this.dataLoadingFlag = false;
      }, (err) => {
        this.spinner.hide();
        console.log('data error: ', err);
        this.cdref.detectChanges();
      });
    }
  
    reload() {
      this.renderData(this.tableOptions);
    }
  
    setPage(pageInfo) {
      this.tableOptions.draw = pageInfo.offset + 1;
      let start = (this.tableOptions.draw * this.tableOptions.length) - this.tableOptions.length;
      this.tableOptions['start'] = start;
      this.renderData(this.tableOptions);
    }
  
    setPageLength(value) {
          console.log(value);
          this.tableOptions.length = Number(value);
          this.renderData(this.tableOptions);
      }
  
    toggleFilters() {
          this.isCollapsed = !this.isCollapsed;
    }
    
    createFilterForm() {
          this.filterForm = this.fb.group({
            order_number:[],
            order_date:[],
            implementationEndDate:[]
          });
    }


    
	/**
   * rowDetailsToggleExpand
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  preparData(data){
    data.order_date = (data.order_date === null? null: this.dConvert.convertToGregorianDate(data.order_date));
    data.implementationEndDate = (data.implementationEndDate === null? null: this.dConvert.convertToGregorianDate(data.implementationEndDate));

    return data;
  }
	
	applyFilter() {
        let cols: DataTableColumn[] = this.tableOptions.columns;
        let newCols: any;
        let filterValues = this.preparData(this.filterForm.value);
        console.log('Data: ', filterValues);
        console.log('Columns: ', cols);

        newCols = cols.map((col) => {
            col.search = { value: '', regex: false };
            col.searchable = false;

            for (let key in filterValues) {
                if (col.name.toLowerCase() == key && filterValues[key]) {
                    col.search = { value: filterValues[key], regex: true };
                    col.searchable = true;
                }
            }
            return col;
        });
        console.log('data columns: ', newCols);

        this.tableOptions.columns = newCols;
        this.renderData(this.tableOptions);
    }

    resetFilters() {
        this.filterForm.reset();
        this.applyFilter();
	}

	searchColumn(searchTerm, index) {
		this.tableOptions = this.dtService.searchColumn(this.tableOptions, index, searchTerm);
		this.renderData(this.tableOptions);
	}

	orderColumn(columnOptions, index) {
        if (columnOptions['orderable'] == true) {
            this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
            this.renderData(this.tableOptions);
        }
	}
	
	addNewRecord() {
		this.router.navigate(['profiles/add'])
		this.loading = true;
	}


  viewOrder(id){
    this.router.navigate([`order/view/${id}`]);
  }

	editRecord() {
		this.loading = true;
	}

	showSuccessToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toastr.success(msg, header, {
            positionClass: 'toast-top-left',
        });
	}
	
	showErrorToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toastr.error(msg, header, {
            positionClass: 'toast-top-left',
        });
    }

	deleteRecord() {
		this.loading = true;
		if(this.toBeDeletedRecordId){
			this.orderService
                .delete(this.toBeDeletedRecordId)
                .subscribe(
                    (data) => {
                        if (data) {
                            this.spinner.hide();
                            this.rows = this.rows.filter((r) => r.ID != this.toBeDeletedRecordId);
                            this.showSuccessToast('PROFILE', 'DELETE_SUCCESS_MSG');
                            this.toBeDeletedRecordId = null;
							this.reload();
                        } else {
                            this.spinner.hide();
                            this.showErrorToast("PROFILE", "ERR_MSG");
                        }
                    },
                    (err) => {
                        this.spinner.hide();
                        this.showErrorToast("PROFILE", "ERR_MSG");
                    });
		}

	}

	

	open(decreeData, component, cType = 'other', size = 'lg') {
        const modalRef = this.modalService.open(component, {
            centered: true,
            size: <any>size,
            backdrop: cType == 'view' ? true : 'static',
            keyboard: cType == 'view' ? true : false
        });
        if (decreeData) {
            modalRef.componentInstance.data = decreeData;
        }
        modalRef.result.then(data => {
            console.log("🚀 ~ file: decree.component.ts ~ line 225 ~ DecreeComponent ~ open ~ data", data)
            switch (data.type) {
                case 'edit':
                    this.renderData(this.tableOptions);
                    break;
            }
        }).catch(err => {
            console.log('Modal dismissed');
        });
	}

	

	


	confirmDeleteModal(content, id) {
        console.log("iddd", id);
        this.toBeDeletedRecordId = id;
        this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    }
	
	profileDetail(id){
		console.log("id:", id);
		
		this.router.navigate(['profiles/'+id+'/details']);
		  
	}


	testTableOptions() {
		return {
			"draw": 1,
			"columns": [
				{
					"data": "ord.id", "name": "ID",
					"searchable": false, "orderable": true, 
					"search": { "value": "", "regex": false }
				},
				{
					"data": "ord.order_number", "name": "ORDER_NUMBER",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "ord.order_date", "name": "ORDER_DATE",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
        // {
				// 	"data": "ord.summary", "name": "SUMMARY",
				// 	"searchable": true, "orderable": true, 
				// 	"search": { "value": "", "searchable": true, "regex": false }
				// },
        {
					"data": "ord.implementation_end_date as implementation", "name": "IMPLEMENTATION",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				}
			],
			"order": [{ "column": 0, "dir": "DESC" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}

   
}
