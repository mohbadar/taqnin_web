import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { RetirementService } from 'app/retirement/retirement.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-retirement',
  templateUrl: './list-retirement.component.html',
  styleUrls: ['./list-retirement.component.scss' , '/assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RetirementListComponent implements OnInit {
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

  constructor(private cdref: ChangeDetectorRef, public translate: TranslateService, private router: Router,
		private fb: FormBuilder, private dtService: DatatablesService,
		private spinner : NgxSpinnerService,
    private dConvert: DateConvertService,
		private sysRegService: SystemRegistryService, private retirementService: RetirementService) { }

  ngOnInit(): void {
    this.filters = null;
		this.pageLengths = this.dtService.pageLengths;
		this.cssClasses = this.dtService.cssClasses;
        this.tblMsgs = this.dtService.getTableMsgs();

		this.tableOptions = this.testTableOptions();
		this.columns = this.dtService.getColumnsArray(this.tableOptions);
		// this.createFilterForm();
		this.renderData(this.tableOptions);
  }

  ngOnDestroy(){
		this.spinner.hide();
	}

	renderData(tableOptions) {
		this.spinner.show();
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.dataLoadingFlag = true;
		this.retirementService.getRetirementReadyList(tableOptions, this.filters).subscribe((data:any) => {
			if (data == null) {
				this.rows = [];
				this.recordsTotal = 0;
			} else {
				console.log(data.data);
				console.log(data);

				this.rows = this.dtService.parseDatatableData(this, tableOptions, data.data);
				this.recordsTotal = data.recordsTotal;
			}

			// // for page number 1 as offset starts with 0
			// this.table.offset = 0;
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
            
        });
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

	onSort(event) {
		const sort = event.sorts[0];

		console.log(event.column.name);
		console.log(event.newValue);
		console.log(event);
	}

  calculateAge(dob){
		console.log("dob: ", dob);
		let dateGrego = this.dConvert.convertToGregorianDate(dob);
		let dobdiff= this.dConvert.ageFromDateOfBirthday(dateGrego);
    if(dobdiff > 65)
    {return dobdiff-65;}
    else{
      return null;
    }

	}

  calculateYear(year){
    let newYear: number = year / 365;
    var answer = Math.floor(newYear)
    answer = answer - 40;
    if(answer > 0)
    {
      return answer;
    }
    else{
      return null;
    }
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
					"data": "pro.first_name as name", "name": "NAME",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "pro.last_name as lname", "name": "LNAME",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
        {
					"data": "pro.father_name as fname", "name": "FNAME",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
        {
					"data": "s.name_dr as status", "name": "STATUS",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
        {
					"data": "pro.position_title", "name": "POSITION_TITLE",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
        {
					"data": "pro.profile_code", "name": "PROFILE_CODE",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
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
				},
        {
					"data": "pro.dob", "name": "DOB",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
        {
					"data": "pwork.days as day", "name": "DAY",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
			],
			"order": [{ "column": 0, "dir": "DESC" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}

}
