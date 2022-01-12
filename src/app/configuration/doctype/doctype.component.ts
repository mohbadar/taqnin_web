import { Globals } from './../../_helpers/globals';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Doctype } from './doctype'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctypeService } from '../../services/doctype.service';
import { DoctypeCreateDialogComponent } from './dialogs/doctype-create-dialog/doctype-create-dialog.component';
import { DoctypeViewDialogComponent } from './dialogs/doctype-view-dialog/doctype-view-dialog.component';
import { DoctypeEditDialogComponent } from './dialogs/doctype-edit-dialog/doctype-edit-dialog.component';
import { DoctypeDeleteDialogComponent } from './dialogs/doctype-delete-dialog/doctype-delete-dialog.component';


@Component({
	selector: 'app-doctype-configuration',
	templateUrl: './doctype.component.html',
	styleUrls: ['./doctype.component.scss']
})
export class DoctypeComponent implements OnInit {
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
		public translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		public globals: Globals,
		private doctypeService: DoctypeService,
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
		this.doctypeService.getDoctypes().subscribe(data => {
			console.log('Doctypes list: ', data);
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
		const modalRef = this.modalService.open(DoctypeCreateDialogComponent);
		modalRef.componentInstance.doctypeCreateEventEmitter.subscribe((createdRecord) => {
				// this.rows = this.rows.concat(createdRecord);
			this.reloadData();
		});
	}

	viewRecord(recordId) {
		this.spinner.show();
		this.doctypeService.getDoctypeById(recordId).subscribe(data => {
			console.log('you data has', data);
			const modalRef = this.modalService.open(DoctypeViewDialogComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
		});
	}

	editRecord(recordId) {
		this.spinner.show();
		this.doctypeService.getDoctypeById(recordId).subscribe(data => {
			console.log('the doctype returned is', data);
			const modalRef = this.modalService.open(DoctypeEditDialogComponent);
			modalRef.componentInstance.data = data;
			modalRef.componentInstance.doctypeEditEventEmitter.subscribe((updatedRecord) => {
				// this.updateArray(updatedRecord);
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
		const modalRef = this.modalService.open(DoctypeDeleteDialogComponent);
		modalRef.componentInstance.data = recordId;
		modalRef.componentInstance.doctypeDeleteEventEmitter.subscribe(() => {
		this.reloadData();
		});
	}

}


