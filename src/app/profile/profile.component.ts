import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { DatatablesService } from 'app/_services/datatables.service'
import { SystemRegistryService } from './../admin/system-registry/system-registry.service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { PrintProfileComponent } from './components/details-profile/component/add-print-profile/print-profile.component';
import { Globals } from 'app/_helpers/globals';
import { ToastrService } from 'ngx-toastr';
import { DateConvertService } from 'app/services/date-convert.service';
import { HistoryProfileComponent } from './components/history-profile/history-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '/assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
	// Datatable specific variables
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
	
	constructor(private cdref: ChangeDetectorRef, public translate: TranslateService, 
		private spinner:NgxSpinnerService,
		private modalService: NgbModal,
		private router: Router,
		private fb: FormBuilder, 
		public globals: Globals,
		public toastr: ToastrService,
		private dConvert: DateConvertService,
		private dtService: DatatablesService,
		private sysRegService: SystemRegistryService, private profileService: ProfileService) {

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
		localStorage.removeItem('tab');
	}

	renderData(tableOptions) {
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.profileService.getRecordList(tableOptions, this.filters).subscribe((data:any) => {
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
			enid:[],
			first_name:[],
			father_name:[],
			position_title:[],
			profile_code:[],
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
		this.router.navigate(['profiles/add'])
		this.loading = true;
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
			this.profileService
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

	viewProfile(id) {
		console.log("id", id);
		this.open(id, PrintProfileComponent, 'view', 'md');
    }

	profileHistory(id){
		console.log("id", id);
		this.open(id, HistoryProfileComponent, 'view', 'xl');
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

	loadEducation(id){
		this.level = null;
		console.log("education Level: ", id);
		this.profileService.getLastestEducationByProfile(id).subscribe(res=>{
			this.level = res["objection"]?res["objection"].level.nameDr:'';
			this.cdref.detectChanges();
			
		},err=>{
			console.log("education error");
		});


	}

	calculateAge(dob){
		console.log("dob: ", dob);
		let dateGrego = this.dConvert.convertToGregorianDate(dob);
		return this.dConvert.ageFromDateOfBirthday(dateGrego);

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
					"data": "pro.id", "name": "ID",
					"searchable": false, "orderable": true, 
					"search": { "value": "", "regex": false }
				},
				{
					"data": "pro.first_name", "name": "FIRST_NAME",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "pro.last_name", "name": "LAST_NAME",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "pro.approve", "name": "APPROVE",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "pro.father_name", "name": "FATHER_NAME",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "pro.position_title", "name": "POSITION_TITLE",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "po.name_dr as position", "name": "POSITION",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "mp.name_dr as mposition", "name": "MPOSITION",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "pro.avatar", "name": "AVATAR",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "pro.profile_code", "name": "PROFILE_CODE",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "pro.dob", "name": "DOB",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "prov.name_dr as province", "name": "PROVINCE",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "et.name_dr as ethnicity", "name": "ETHNICITY",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "s.name_dr as status", "name": "STATUS",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "m.name_dr as ministry", "name": "MINISTRY",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "a.name_dr as authority", "name": "AUTHORITY",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				}
				,
				{
					"data": "c.name_dr as commission", "name": "COMMISSION",
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
}
