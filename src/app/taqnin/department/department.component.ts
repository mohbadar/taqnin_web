import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { DepartmentService } from './department.service';
import { DepartmentCreateComponent } from './dialogs/department-create/department-create.component';
import { DepartmentDeleteComponent } from './dialogs/department-delete/department-delete.component';
import { DepartmentEditComponent } from './dialogs/department-edit/department-edit.component';
import { DepartmentViewComponent } from './dialogs/department-view/department-view.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

	@ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;
	rows = [];
	tempRows = [];
	columnsWithSearch = [];
	closeResult = '';
	dTableFlag = false;
	dTable;
	loading;


	constructor(
		public httpClient: HttpClient,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		public globals: Globals,
		private departmentService: DepartmentService,
		private cdref: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.reloadData();
	}

	refresh() {
		this.reloadData();
	}


	reloadData() {
		this.loading = true;
		this.dTableFlag = false;
		this.departmentService.getRecordList().subscribe(data => {
			console.log('Countries list: ', data);
			this.rows = data;
			this.tempRows = this.rows;
			this.dTableFlag = true;
			this.loading = false;
			this.cdref.detectChanges();
			// for specific columns to be search instead of all you can list them by name
			this.columnsWithSearch = Object.keys(this.rows[0]);

		}, (err) => {
			console.log('data error: ', err);
			this.loading = false;
		});
	}

	searchTerm(val) {
		// filter our data
		const temp = this.tempRows.filter((d) => {
			console.log(d);
			// single filter
			// return d.name.toLowerCase().indexOf(val) !== -1 || !val;

			// Multi Column Filter
			// iterate through each row's column data
			for (let i = 0; i < this.columnsWithSearch.length; i++){
				var colValue = d[this.columnsWithSearch[i]] ;
	
				// if no filter OR colvalue is NOT null AND contains the given filter
				if (!val || (!!colValue && colValue.toString().toLowerCase().indexOf(val) !== -1)) {
					// found match, return true to add to result set
					return true;
				}
			}
		});
	
		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		this.table.offset = 0;
	}

	addNew() {
		const modalRef = this.modalService.open(DepartmentCreateComponent);
		modalRef.componentInstance.decisionCreateEventEmitter.subscribe((createdRecord) => {
			this.reloadData();
		});
	}

	viewRecord(recordId) {
		this.spinner.show();
		this.departmentService.getCountry(recordId).subscribe(data => {
			console.log('you data has', data);
			const modalRef = this.modalService.open(DepartmentViewComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
		});
	}

	editRecord(recordId) {
		this.spinner.show();
		this.departmentService.getCountry(recordId).subscribe(data => {
			console.log('the ministry returned is', data);
			const modalRef = this.modalService.open(DepartmentEditComponent);
			modalRef.componentInstance.data = data;
			modalRef.componentInstance.decisionEditEventEmitter.subscribe(() => {
				this.reloadData();
			})
			this.spinner.hide();
		}, error => {
			console.log('Error: ', error);
			this.spinner.hide();
		});
	}

	deleteRecord(recordId) 
	{
		const modalRef = this.modalService.open(DepartmentDeleteComponent);
		modalRef.componentInstance.data = recordId;
		modalRef.componentInstance.decisionDeleteEventEmitter.subscribe(() => {
		this.reloadData();
		});
	}

}
