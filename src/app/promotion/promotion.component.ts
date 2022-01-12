import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PromotionService } from './promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss', '/assets/sass/libs/datatables.scss']
})
export class PromotionComponent implements OnInit{
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
    promotionIndividuals;
    filterForm: FormGroup;
    viewRecordInModal: any = true;
    isCollapsed: boolean = false;
    showFilterForm: boolean;

	filters;
	
	loading = false;
	
	constructor(private cdref: ChangeDetectorRef, public translate: TranslateService, private router: Router,
		private fb: FormBuilder, private dtService: DatatablesService,
		private spinner:NgxSpinnerService,
		private sysRegService: SystemRegistryService, private promotionService: PromotionService) {

	}

	ngOnInit(): void {
		this.spinner.show();
		this.filters = null;
		this.pageLengths = this.dtService.pageLengths;
		this.cssClasses = this.dtService.cssClasses;
        this.tblMsgs = this.dtService.getTableMsgs();

		this.tableOptions = this.testTableOptions();
		this.columns = this.dtService.getColumnsArray(this.tableOptions);
		// this.createFilterForm();
		 //this.renderData(this.tableOptions);
		this.promotionIndividuals = [
			{ id: 1, firstName: 'Ahmad' , lastName: 'Ahmadi' , occupation: 'Minister' , organization: 'Ministry of Finance'  },
			{ id: 2, firstName: 'Mahmood' , lastName: 'Mahmoodi' , occupation: 'Minister' , organization: 'Ministry of Justice'  },
			{ id: 3, firstName: 'Mohammad' , lastName: 'Mohammadi' , occupation: 'Minister' , organization: 'Ministry of Information and Culture'  }
		]
		console.log(this.promotionIndividuals)
		this.rows = this.promotionIndividuals;
	}

	ngOnDestroy(){
		this.spinner.hide();
	}
	

	// renderData(tableOptions) {
	// 	// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
	// 	this.dataLoadingFlag = true;
	// 	this.promotionService.getPromotionList().subscribe((data:any) => {
	// 		if (data == null) {
	// 			this.rows = [];
	// 			this.recordsTotal = 0;
	// 		} else {
	// 			console.log(data);

	// 			this.rows = data;
	// 			this.recordsTotal = data.recordsTotal;
	// 		}

	// 		// // for page number 1 as offset starts with 0
	// 		// this.table.offset = 0;

	// 		this.cdref.detectChanges();
	// 		this.dataLoadingFlag = false;
	// 	}, (err) => {
	// 		console.log('data error: ', err);
	// 		this.cdref.detectChanges();
	// 	});
	// }

	reload() {
		this.promotionIndividuals(this.tableOptions);
	}

	setPage(pageInfo) {
		this.tableOptions.draw = pageInfo.offset + 1;
		let start = (this.tableOptions.draw * this.tableOptions.length) - this.tableOptions.length;
		this.tableOptions['start'] = start;
		this.promotionIndividuals(this.tableOptions);
	}

	setPageLength(value) {
		console.log(value);
		this.tableOptions.length = Number(value);
		this.promotionIndividuals(this.tableOptions);
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
        this.promotionIndividuals(this.tableOptions);
    }

    resetFilters() {
        this.filterForm.reset();
        this.applyFilter();
	}

	searchColumn(searchTerm, index) {
		this.tableOptions = this.dtService.searchColumn(this.tableOptions, index, searchTerm);
		this.promotionIndividuals(this.tableOptions);
	}

	orderColumn(columnOptions, index) {
        if (columnOptions['orderable'] == true) {
            this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
            this.promotionIndividuals(this.tableOptions);
        }
	}

	onSort(event) {
		const sort = event.sorts[0];

		console.log(event.column.name);
		console.log(event.newValue);
		console.log(event);
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
					"data": "id", "name": "ID",
					"searchable": false, "orderable": true, 
					"search": { "value": "", "regex": false }
				},
				{
					"data": "firstName", "name": "FIRSTNAME",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "lastName", "name": "LASTNAME",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "occupation", "name": "OCCUPATION",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "organization", "name": "ORGANIZATION",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
			],
			"order": [{ "column": 0, "dir": "asc" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}
}
