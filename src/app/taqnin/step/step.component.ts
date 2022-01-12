import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { StepCreateComponent } from './dialogs/step-create/step-create.component';
import { StepDeleteComponent } from './dialogs/step-delete/step-delete.component';
import { StepEditComponent } from './dialogs/step-edit/step-edit.component';
import { StepViewComponent } from './dialogs/step-view/step-view.component';
import { StepService } from './step.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

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
		private stepService: StepService,
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
		this.stepService.getRecordList().subscribe(data => {
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
		const modalRef = this.modalService.open(StepCreateComponent);
		modalRef.componentInstance.stepCreateEventEmitter.subscribe((createdid) => {
			this.reloadData();
		});
	}

	viewRecord(recordId) {
		this.spinner.show();
		this.stepService.getRecord(recordId).subscribe(data => {
			console.log('you data has', data);
			const modalRef = this.modalService.open(StepViewComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
		});
	}

	editRecord(recordId) {
		this.spinner.show();
		this.stepService.getRecord(recordId).subscribe(data => {
			console.log('the ministry returned is', data);
			const modalRef = this.modalService.open(StepEditComponent);
			modalRef.componentInstance.data = data;
			modalRef.componentInstance.stepEditEventEmitter.subscribe(() => {
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
		const modalRef = this.modalService.open(StepDeleteComponent);
		modalRef.componentInstance.data = recordId;
		modalRef.componentInstance.decisionDeleteEventEmitter.subscribe(() => {
		this.reloadData();
		});
	}
}
