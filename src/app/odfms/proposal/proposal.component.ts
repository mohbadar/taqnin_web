import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { DatatablesService } from 'app/_services/datatables.service'
import { SystemRegistryService } from '../../admin/system-registry/system-registry.service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { ProposalService } from './proposal.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DetailProposalComponent } from './components/detail-proposal/detail-proposal.component';
import { th } from 'date-fns/locale';
import { Globals } from 'app/_helpers/globals';
import { UploadProposalComponent } from './components/upload-proposal/upload-proposal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HistoryProposalComponent } from './components/history-proposal/history-proposal.component';
import { DateConvertService } from 'app/services/date-convert.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss', '../../../assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProposalComponent implements OnInit {
  // Datatable specific variables
  @ViewChild(DatatableComponent) table: DatatableComponent;
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

  loading = false;
  closeResult: string;
  documentStatusList: any;

  constructor(private cdref: ChangeDetectorRef,
    public translate: TranslateService,
    private router: Router,
    private fb: FormBuilder,
    private dConvert: DateConvertService,
    private dtService: DatatablesService,
    private modalService: NgbModal,
    private sysRegService: SystemRegistryService,
    private proposalService: ProposalService,
    public globals: Globals,
    public spinner: NgxSpinnerService
    ) {

  }

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
    this.spinner.show();
    // the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
    this.dataLoadingFlag = true;
    this.proposalService.getRecordList(tableOptions, this.filters).subscribe((data: any) => {
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
      console.log('data error: ', err);
      this.cdref.detectChanges();
      this.spinner.hide();
    });
  }

 

  reload() {
    this.renderData(this.tableOptions);
    this.ngAfterViewInit();
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

  createFilterForm() {
    this.filterForm = this.fb.group({
      proposalNumber: [''],
      proposalDate: ['']
    });
  }

  preparData(data){
    data.proposalDate = (data.proposalDate === null? null: this.dConvert.convertToGregorianDate(data.proposalDate));
    return data;
  }

  applyFilter() {
    let cols: DataTableColumn[] = this.tableOptions.columns;
    let newCols: any;
    let filterValues = this.filterForm.value;
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
    this.router.navigate(['proposal/add'])
    this.loading = true;
  }

  editProposal(id) {
    console.log('edit proposal id:', id);
    this.open(id, 'detail', DetailProposalComponent);
  }
  // Open default modal
  open(id, formType, component) {
    const modalRef = this.modalService.open(component, { size: 'xl' });
    modalRef.componentInstance.editId = id;
    modalRef.componentInstance.formType = formType;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  downloadAttachment(id) {
    this.proposalService.downloadAttachment(id);
  }


  confirmDeleteModal(content, id) {
    this.toBeDeletedRecordId = id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  deleteRecord(id) {
    this.proposalService.deleteRecord(this.toBeDeletedRecordId).subscribe(res => {
      console.log("deleted record", res);

      this.renderData(this.tableOptions);
    });

  }

  testTableOptions() {
    return {
      draw: 1,
      columns: [
        {
          "data": "pro.id", "name": "ID",
          "searchable": false, "orderable": true, "visible": false,
          "search": { "value": "", "regex": false }
        },
        // {
        //   "data": "dt.name_dr as document_type", "name": "DOCUMENT_TYPE",
        //   "searchable": false, "orderable": false, "visible": true,
        //   "search": { "value": "", "searchable": false, "regex": false }
        // },
        {
          "data": "pro.proposal_number as shumara", "name": "SHUMARA",
          "searchable": false, "orderable": false, "visible": true,
          "search": { "value": "", "searchable": false, "regex": false }
        },
        {
          "data": "pro.proposal_date as pro_date", "name": "PRO_DATE",
          "searchable": false, "orderable": false, "visible": true,
          "search": { "value": "", "searchable": false, "regex": false }
        },
        // {
				// 	"data": "mm.name_dr as morsal_ministry", "name": "MORSAL_MINISTRY",
				// 	"searchable": false, "orderable": true,
				// 	"search": { "value": "", "regex": false }
				// },
        // {
				// 	"data": "ma.name_dr as morsal_authority", "name": "MORSAL_AUTHORITY",
				// 	"searchable": false, "orderable": true,
				// 	"search": { "value": "", "regex": false }
				// },
        {
					"data": "pro.summary", "name": "SUMMARY",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
        {
					"data": "pro.objective", "name": "OBJECTIVE",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				}
        ,
				{
					"data": "s.name_dr as shura", "name": "SHURA",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				}
      ],
      "order": [{ "column": 0, "dir": "DESC" }],
      "start": 0,
      "length": 10,
      "search": { "value": "", "regex": false }
    }
  }

  ngAfterViewInit() {
    // this.table.offset = this.pageLengths - 1;
  }

  viewRecord(id) {
    this.router.navigate([`proposal/view/${id}`]);
  }

  editRecord(id) {
    this.router.navigate([`proposal/detail/${id}`]);
  }

  uploadAttachment(id) {
    const modalRef = this.modalService.open(UploadProposalComponent);
    modalRef.componentInstance.proposalId = id;
  }

  proposalHistory(rowId){
		console.log("id", rowId);
    const modalRef = this.modalService.open(HistoryProposalComponent, {size: 'xl'});
		modalRef.componentInstance.data = rowId;
	}
}
