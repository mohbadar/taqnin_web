import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { Globals } from 'app/_helpers/globals';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentAttachmentComponent } from './components/create-document/document-attachment/document-attachment.component';
import { ViewAttachmentFileComponent } from './components/create-document/document-attachment/view-attachment-file/view-attachment-file.component';
import { DocumentDepartmentListComponent } from './components/document-department-list/document-department-list.component';
import { DocumentDeleteComponent } from './components/document-view-details/document-delete/document-delete.component';
import { DocumentService } from './document.service';

@Component({
	selector: 'app-taqnin-document',
	templateUrl: './document.component.html',
	styleUrls: ['./document.component.scss']
})
export class TaqninDocumentComponent implements OnInit {
	// Datatable specific variables
	@ViewChild(DatatableComponent) table: DatatableComponent;
	@ViewChild('tableRowDetails') tableRowDetails: any;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	tableOptions;
	tblMsgs;
	columns;
	dataLoadingFlag: boolean;
	reorderable = true;
	swapColumns = false;
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

	constructor(private cdref: ChangeDetectorRef, public translate: TranslateService,
		private spinner: NgxSpinnerService,
		private router: Router,
		private fb: FormBuilder,
		private dtService: DatatablesService,
		private documentService: DocumentService,
		private modalService: NgbModal,
		private dateConvert: DateConvertService,
    public globals: Globals,
	) { }

	ngOnInit(): void {
		this.filters = null;
		this.pageLengths = this.dtService.pageLengths;
		this.cssClasses = this.dtService.cssClasses;
		this.tblMsgs = this.dtService.getTableMsgs();

		this.tableOptions = this.getTableOptions();
		this.columns = this.dtService.getColumnsArray(this.tableOptions);
		this.createFilterForm();
		this.renderData(this.tableOptions, this.filters);
	}



	renderData(tableOptions, filters) {
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.documentService.getRecordList(tableOptions, filters).subscribe((data: any) => {
			console.log(data);
			if (data == null) {
				this.rows = [];
				this.recordsTotal = 0;
			} else {
				console.log("data from server ", data.data);
				this.spinner.hide();
				this.rows = this.dtService.parseDatatableData(this, tableOptions, data.data);
				// this.rows = data.data;
				// this.rows = this.dtService.parseDatatableData(this,tableOptions,data.results)
				this.recordsTotal = data.recordsTotal;
			}

			this.cdref.detectChanges();
			this.dataLoadingFlag = false;
		}, (err) => {
			this.spinner.hide();
			console.log('data error: ', err);
			// this.cdref.detectChanges();
		});
	}

	reload() {
		this.renderData(this.tableOptions, this.filters);
	}

	setPage(pageInfo) {
		this.tableOptions.draw = pageInfo.offset + 1;
		let start = (this.tableOptions.draw * this.tableOptions.length) - this.tableOptions.length;
		this.tableOptions['start'] = start;
		this.renderData(this.tableOptions, this.filters);
	}

	setPageLength(value) {
		console.log(value);
		this.tableOptions.length = Number(value);
		this.renderData(this.tableOptions, this.filters);
	}

	toggleFilters() {
		this.isCollapsed = !this.isCollapsed;
	}

	createFilterForm() {
		this.filterForm = this.fb.group({
			number: [],
			createdAt: [],
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
	prepareData(data){
		data.createdAt = (data.createdAt === null? null: this.dateConvert.convertToGregorianDate(data.createdAt));
		return data;
	}
	applyFilter() {
		let cols: DataTableColumn[] = this.tableOptions.columns;
		let newCols: any;
		let filterValues = this.prepareData( this.filterForm.value);
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
		this.renderData(this.tableOptions, this.filters);
	}

	resetFilters() {
		this.filterForm.reset();
		this.applyFilter();
	}

	searchColumn(searchTerm, index) {
		this.tableOptions = this.dtService.searchColumn(this.tableOptions, index, searchTerm);
		this.renderData(this.tableOptions, this.filters);
	}

	orderColumn(columnOptions, index) {
		if (columnOptions['orderable'] == true) {
			this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
			this.renderData(this.tableOptions, this.filters);
		}
	}

	onSort(event) {
		// event was triggered, start sort sequence
		console.log('Sort Event', event);
		event.sorts[0].prop
		let index = this.dtService.getColumnIndex(this.tableOptions, event.sorts[0].prop);
		this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
		this.renderData(this.tableOptions, this.filters);
	}

	addNewRecord() {
		this.router.navigate(['documents/add']);
		this.loading = true;
	}

	editRecord() {
		this.loading = true;
	}

	deleteDocument(documentId) {
		const modalRef = this.modalService.open(DocumentDeleteComponent);
		modalRef.componentInstance.data = documentId;
		modalRef.componentInstance.documentDeleteEventEmitter.subscribe(() => {
			this.reload();
		});

	}

	getTableOptions() {
		return {
			"draw": 1,
			"columns": [
				{
					"data": "doc.id", "name": "ID",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "doc.title", "name": "TITLE",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "doc.number", "name": "NUMBER",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "doc.date", "name": "DATE",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "org.name_dr as organization", "name": "ORGANIZATION",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
        {
					"data": "type.name_dr as doctype", "name": "DOCTYPE",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "doc.body", "name": "BODY",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "doc.approved", "name": "APPROVED",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				}
			],
			"order": [{ "column": 0, "dir": "desc" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}

	viewDocumentDetails(documentId) {
		this.router.navigate([`documents/view/${documentId}`])
	}


	documentDepartmentList(id) {
		const modalRef = this.modalService.open(DocumentDepartmentListComponent, { size: 'xl', backdrop: 'static' });
		modalRef.componentInstance.data = id;
		// modalRef.componentInstance.documentCommentEventEmitter.subscribe(() => {

		// })
	}

	// chooseFile(id) {
	// 	const modalRef = this.modalService.open(DocumentAttachmentComponent);
	// 	modalRef.componentInstance.data = id;
	// }

    viewFile(documentId) {
		const modalRef = this.modalService.open(ViewAttachmentFileComponent, { size: 'xl', backdrop: 'static' });
		modalRef.componentInstance.documentId = documentId;
	  }

    downloadAttachement(id){ //document Id
      this.documentService.downloadAttachment(id);
    }

}
