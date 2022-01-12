import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { DatatablesService } from 'app/_services/datatables.service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { RecruitmentService } from './recruitment.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
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

  constructor(
    private cdref: ChangeDetectorRef, public translate: TranslateService, private router: Router,
		private fb: FormBuilder, private dtService: DatatablesService,
		private sysRegService: SystemRegistryService, private recruitService:RecruitmentService
  ) { }

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

  renderData(tableOptions) {
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.dataLoadingFlag = true;
		this.recruitService.getRecordList(tableOptions, this.filters).subscribe((data:any) => {
			if (data == null) {
				this.rows = [];
				this.recordsTotal = 0;
			} else {
				console.log(data.data);
				console.log(data);

				this.rows = this.dtService.parseDatatableData(this, tableOptions, data.data);
				this.recordsTotal = data.recordsTotal;
			}

			this.cdref.detectChanges();
			this.dataLoadingFlag = false;
		}, (err) => {
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
	
	addNewRecord() {
		this.router.navigate(['recruitments/add'])
		this.loading = true;
	}

	editRecord() {
		this.loading = true;
	}

	deleteRecord() {
		this.loading = true;
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
					"data": "pro.surname", "name": "SURNAME",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "pro.age", "name": "AGE",
					"searchable": true, "orderable": true, 
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "pro.status", "name": "STATUS",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				}
			],
			"order": [{ "column": 0, "dir": "asc" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}

}
