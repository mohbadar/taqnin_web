import { StepService } from './../step/step.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import {WorkflowService} from './workflow.service';
import {WorkflowEditComponent} from './components/workflow-edit/workflow-edit.component';
import {WorkflowCreateComponent} from './components/workflow-create/workflow-create.component';
import {WorkflowDeleteComponent} from './components/workflow-delete/workflow-delete.component';
import { Router } from '@angular/router';
import { WorkflowViewComponent } from './components/workflow-view/workflow-view.component';
@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
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
    public translate: TranslateService,
		public httpClient: HttpClient,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		public globals: Globals,
		private service: WorkflowService,
		private cdref: ChangeDetectorRef,
		private router: Router,
    private stepService: StepService
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
		this.service.getRecordList().subscribe(data => {
			console.log('Workflow list: ', data);
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
	const modalRef = this.modalService.open(WorkflowCreateComponent);
	modalRef.componentInstance.workflowCreateEventEmitter.subscribe(() => {
		this.reloadData();
	});
	}


  viewRecord(recordId) {
		this.spinner.show();
		this.service.getRecord(recordId).subscribe(data => {
			console.log('you data has', data);
			const modalRef = this.modalService.open(WorkflowViewComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
		});
	}

	editRecord(recordId) {
		this.spinner.show();
		this.service.getRecord(recordId).subscribe(data => {
			console.log('the workflow returned is', data);
			const modalRef = this.modalService.open(WorkflowEditComponent);
			modalRef.componentInstance.data = data;
			modalRef.componentInstance.workflowEditEventEmitter.subscribe(() => {
				this.reloadData();
			});
			this.spinner.hide();
		}, error => {
			console.log('Error: ', error);
			this.spinner.hide();
		});
	}

	deleteRecord(recordId)
	{
		const modalRef = this.modalService.open(WorkflowDeleteComponent);
		modalRef.componentInstance.data = recordId;
		modalRef.componentInstance.workflowDeleteEventEmitter.subscribe(() => {
		this.reloadData();
		});
	}


}
