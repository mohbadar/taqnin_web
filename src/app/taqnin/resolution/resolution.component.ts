import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { Globals } from 'app/_helpers/globals';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProposalService } from '../proposal/proposal.service';
import { ResolutionService } from './resolution.service';

@Component({
  selector: 'app-resolution',
  templateUrl: './resolution.component.html',
  styleUrls: ['./resolution.component.scss']
})
export class ResolutionComponent implements OnInit {
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

  filterForm: FormGroup;
  viewRecordInModal: any = true;
  isCollapsed: boolean = false;
  showFilterForm: boolean;

  filters;

  loading = false;
  closeResult: string;
  documentStatusList: any;

  selectResolutionsForm: FormGroup;

  constructor(
    private cdref: ChangeDetectorRef,
    public translate: TranslateService,
    private router: Router,
    private fb: FormBuilder,
    private dtService: DatatablesService,
    private modalService: NgbModal,
    private sysRegService: SystemRegistryService,
    private resolutionService: ResolutionService,
    public globals: Globals,
    public spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildSelectResolutionsForm();
    this.filters = null;
    this.pageLengths = this.dtService.pageLengths;
    this.cssClasses = this.dtService.cssClasses;
    this.tblMsgs = this.dtService.getTableMsgs();

    this.tableOptions = this.testTableOptions();
    this.renderData(this.tableOptions);
  }

  buildSelectResolutionsForm() {
    this.selectResolutionsForm = this.formBuilder.group({
      agendaYear: [null, Validators.required],
    });
  }

  renderData(tableOptions) {
    this.spinner.show();
    // the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
    this.dataLoadingFlag = true;
    this.resolutionService.getRecordList(tableOptions, this.filters).subscribe((data: any) => {
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
      console.log('data error: ', err);
      this.cdref.detectChanges();
      this.spinner.hide();
    });
  }

  reload() {
    this.renderData(this.tableOptions);
    this.ngAfterViewInit();
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

  createFilterForm() {
    this.filterForm = this.fb.group({
      document_type: [''],
      incoming_date: [''],
      incoming_number: ['']
    });
  }

  applyFilter() {
    this.table.offset = 0;
    this.tableOptions.draw = 1;
    let cols: DataTableColumn[] = this.tableOptions.columns;
    let start = (this.tableOptions.draw * this.tableOptions.length) - this.tableOptions.length;

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
    this.tableOptions['start'] = start;

    this.renderData(this.tableOptions);
  }

  prepareFilter(vl) {
    let d: DataTableColumn[] = this.tableOptions.columns;
    const dd = [];
    console.log('Data: ', vl);
    console.log('Columns: ', d);

    for (let i in vl) {
      console.log('i is: ', i);

      const l = d.filter(t => t.name.toLowerCase() == i)[0];
      console.log('Testing: ', i, " value ", l);

      console.log(' vl[i] : ', vl[i]);

      if (l && vl[i]) {
        l.search = { value: vl[i], regex: true };
        console.log('l.search: ', l);

      } else {
        l.search = { value: '', regex: false };
      }

      dd.push(l);
    }
    console.log('data columns: ', dd);

    return dd;
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
    this.router.navigate(['resolutions/add']);
    this.loading = true;
  }

  // deleteRecord(id) {
  //   this.resolutionService.deleteRecord(this.toBeDeletedRecordId).subscribe(res => {
  //     console.log("deleted record", res);

  //     this.renderData(this.tableOptions);
  //   });

  // }

  testTableOptions() {
    return {
      draw: 1,
      columns: [
        {
          "data": "resolution.id", "name": "ID",
          "searchable": false, "orderable": true, "visible": false,
          "search": { "value": "", "regex": false }
        },
        {
          "data": "resolution.resolution_number as resolution_number", "name": "RESOLUTION_NUMBER",
          "searchable": false, "orderable": false, "visible": true,
          "search": { "value": "", "searchable": false, "regex": false }
        },
        {
          "data": "resolution.resolution_date as resolution_date", "name": "RESOLUTION_DATE",
          "searchable": false, "orderable": false, "visible": true,
          "search": { "value": "", "searchable": false, "regex": false }
        },
        {
          "data": "shura.name_dr as shura", "name": "SHURA",
          "searchable": false, "orderable": true,
          "search": { "value": "", "regex": false }
        },
        {
          "data": "resolution.components as components", "name": "COMPONENTS",
          "searchable": false, "orderable": true,
          "search": { "value": "", "regex": false }
        },
      ],
      "order": [{ "column": 0, "dir": "DESC" }],
      "start": 0,
      "length": 10,
      "search": { "value": "", "regex": false }
    }
  }

  ngAfterViewInit() {
    this.table.offset = this.pageLengths - 1;
  }

  viewResolutionDetails(id) {
    this.router.navigate([`resolutions/view/${id}`]);
  }

}
