import { ViewComplaintComponent } from './view-complaint/view-complaint.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatablesService } from "./../_services/datatables.service";
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";

import { Router } from "@angular/router";
import { EditComplaintComponent } from './edit-complaint/edit-complaint.component';
import { ComplaintService } from 'app/services/complaint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadComplaintComponent } from './upload-complaint/upload-complaint.component';
import { DeleteComplaintComponent } from './delete-complaint/delete-complaint.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableColumn } from 'app/_models/datatable-column';
import { Globals } from 'app/_helpers/globals';
import { HistoryComplaintComponent } from './history-complaint/history-complaint.component';

@Component({
  selector: "app-complaint",
  templateUrl: "./complaint.component.html",
  styleUrls: ["./complaint.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ComplaintComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
  modelRef;
  rows: any[];
	tempRows = [];
	columnsWithSearch = [];
	closeResult = '';
  dataTableFlag = true;
	loading;
  filterForm: FormGroup;
  pageLengths;
  columns;
  cssClasses;
  tblMsgs;
  tableOptions;
  filters;
  recordsTotal: number;
  complaintDocumentTypes;

  constructor(
              private router: Router, 
              private dtService: DatatablesService, 
              private complaintService: ComplaintService,
              private modalService : NgbModal,
              private cdref: ChangeDetectorRef,
              private spinner: NgxSpinnerService,
              public globals: Globals,
              private formBuilder: FormBuilder
              ) {}

  ngOnInit(): void {
    this.filters = null;
    this.pageLengths = this.dtService.pageLengths;
    this.cssClasses = this.dtService.cssClasses;
    this.tblMsgs = this.dtService.getTableMsgs();
    this.tableOptions = this.testTableOptions();
    this.renderData(this.tableOptions);
    this.createFilterForm();
    this.getComplaintDocumentTypes();
  }

  setPage(pageInfo) {
    this.tableOptions.draw = pageInfo.offset + 1;
    let start =
      this.tableOptions.draw * this.tableOptions.length -
      this.tableOptions.length;
    this.tableOptions["start"] = start;
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

  testTableOptions() {
      return {
          "draw": 1,
          "columns": [
              {
                  "data": "pc.id", "name": "ID",
                  "searchable": true, "orderable": true,
                  "search": { "value": "", "regex": false }
              },
              {
                  "data": "pc.entry_number", "name": "ENTRY_NUMBER",
                  "searchable": true, "orderable": true,
                  "search": { "value": "", "searchable": true, "regex": false }
              },
              {
                  "data": "pc.complaint_type", "name": "COMPLAINT_TYPE",
                  "searchable": true, "orderable": true,
                  "search": { "value": "", "searchable": true, "regex": false }
              },
              {
                  "data": "cdt.name_dr as complaint_doc", "name": "COMPLAINT_DOC",
                  "searchable": true, "orderable": true,
                  "search": { "value": "", "searchable": true, "regex": false }
              },
              {
                "data": "pc.complaint_date", "name": "COMPLAINT_DATE",
                "searchable": true, "orderable": true,
                "search": { "value": "", "searchable": true, "regex": false }
              },
              {
                  "data": "pc.accused", "name": "ACCUSED",
                  "searchable": true, "orderable": true,
                  "search": { "value": "", "searchable": true, "regex": false }
              },
              {
                "data": "pc.explanations", "name": "EXPLANATIONS",
                "searchable": true, "orderable": true,
                "search": { "value": "", "searchable": true, "regex": false }
              }
          ],
          "order": [{ "column": 0, "dir": "DESC" }],
          "start": 0,
          "length": 10,
          "search": { "value": "", "regex": false }
      }
  }

  renderData(tableOptions) {
    // the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
    this.loading = true;
    this.spinner.show();
    this.complaintService.getRecordList(tableOptions, this.filters).subscribe((data: any) => {
        if (data == null) {
            console.log(data);
            this.rows = [];
            this.recordsTotal = 0;
        } else {
            console.log("data from server ", data.data);
            console.log(data);
            this.spinner.hide();

            this.rows = this.dtService.parseDatatableData(this, tableOptions, data.data);
            this.recordsTotal = data.recordsTotal;
        }

        this.cdref.detectChanges();
        this.loading = false;
    }, (err) => {
        this.spinner.hide();
        console.log('data error: ', err);
        this.cdref.detectChanges();
    });
	}

  addNewComplaint() {
    this.router.navigateByUrl("complaints/add");
  }
  
  editRecord(recordId) {
    this.spinner.show();
    this.complaintService.getComplaintById(recordId).subscribe(data => {
      console.log('the complaint returned is', data);
      const modalRef = this.modalService.open(EditComplaintComponent);
      this.spinner.hide();
      modalRef.componentInstance.data = data;
      modalRef.componentInstance.complaintEditEventEmitter.subscribe((updatedRecord) => {
        // this.updateArray(updatedRecord);
        this.renderData(this.tableOptions);
      })
    }, error => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }

  viewRecord(recordId) {
		this.spinner.show();
		this.complaintService.getComplaintById(recordId).subscribe(data => {
      this.spinner.hide();
			console.log('you data has', data);
			const modalRef = this.modalService.open(ViewComplaintComponent);
			modalRef.componentInstance.data = data;
		}, error => {
      console.log(error);
			this.spinner.hide();
		});
	}

  uploadAttachments(recordId){
    console.log("Upload attachments");
    const modalRef = this.modalService.open(UploadComplaintComponent);
    modalRef.componentInstance.complaintId = recordId;
  }

  deleteRecord(recordId) 
	{
		const modalRef = this.modalService.open(DeleteComplaintComponent);
		modalRef.componentInstance.data = recordId;
		modalRef.componentInstance.complaintDeleteEventEmitter.subscribe(() => {
		  this.renderData(this.tableOptions);
		});
	}

  createFilterForm() 
  {
    this.filterForm = this.formBuilder.group({
      entry_number: [],
      complaint_doc: [],
      complaint_date: [],
      accused: []
    });
  }

  resetFilters() {
    this.filterForm.reset();
    this.applyFilter();
    this.renderData(this.tableOptions);
  }

  getComplaintDocumentTypes() {
    this.complaintService.getComplaintDocsType().subscribe((response) => {
      this.complaintDocumentTypes = response;
    });
  }

  
  setPageLength(value) {
    console.log(value);
    this.tableOptions.length = Number(value);
    this.renderData(this.tableOptions);
  }

  complaintHistory(rowId){
		console.log("id", rowId);
    const modalRef = this.modalService.open(HistoryComplaintComponent, {size: 'xl'});
		modalRef.componentInstance.data = rowId;
	}


}
