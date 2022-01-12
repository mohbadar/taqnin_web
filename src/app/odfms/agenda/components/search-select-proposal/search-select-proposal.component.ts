import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ProposalService } from 'app/odfms/proposal/proposal.service';
import { Globals } from 'app/_helpers/globals';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';

@Component({
  selector: 'app-search-select-proposal',
  templateUrl: './search-select-proposal.component.html',
  styleUrls: ['./search-select-proposal.component.scss']
})
export class SearchSelectProposalComponent implements OnInit {
	@Output() response: EventEmitter<any> = new EventEmitter();
	filterForm: FormGroup;
    selectedRecord;
    documentStatusList: any;

    ColumnMode = ColumnMode;
    tableOptions;
    tblMsgs;
    columns;
    dataLoadingFlag: boolean = false;
    rows: any[];
    recordsTotal: number;
    pageLengths;
    cssClasses;
    proposalDocumentTypes$;
    suggestionTypes$;
    suggestionStatus$;
    filters;

	constructor(private cdref: ChangeDetectorRef, private fb: FormBuilder,
        public dialogRef: NgbActiveModal,
        private dtService: DatatablesService, public globals: Globals,
        private proposalService: ProposalService,) {

		this.filters = null;
		this.pageLengths = this.dtService.pageLengths;
		this.cssClasses = this.dtService.cssClasses;
		this.tblMsgs = this.dtService.getTableMsgs();
	}

	ngOnInit(): void {
		this.tableOptions = this.testTableOptions();
        this.columns = this.dtService.getColumnsArray(this.tableOptions);
        console.log("columns are:", this.columns as JSON);

        this.initiliazForm();
        // this.fetchEssentialData();
	}

	initiliazForm() {
        this.filterForm = this.fb.group({
            document_type: [''],
            incoming_date: [''],
            incoming_number: ['']
        });
    }

    fetchEssentialData() {
        this.proposalService.getLoadData().subscribe((response: any) => {
            console.log('res of loaded data', response);
            this.documentStatusList = response.documentType;
        });
    }

    renderData(tableOptions, filters) {
        // the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
        this.dataLoadingFlag = true;
        this.proposalService.getRecordList(tableOptions, filters).subscribe((data: any) => {
            console.log("res: ", data);
            if (data == null) {
                this.rows = [];
                this.recordsTotal = 0;
            } else {
                console.log("the data returned is:", data as JSON);

                this.rows = this.dtService.parseDatatableData(
                    this,
                    tableOptions,
                    data.data
                );
                this.recordsTotal = data.recordsFiltered;
            }

            this.cdref.detectChanges();
            this.dataLoadingFlag = false;
        }, (err) => {
            console.log("data error: ", err);
            this.dataLoadingFlag = false;
            this.rows = [];
            this.recordsTotal = 0;
        });

    }

    /**
     * datatable specific methods
     */
    setPage(pageInfo) {
        this.tableOptions.draw = pageInfo.offset + 1;
        let start =
            this.tableOptions.draw * this.tableOptions.length -
            this.tableOptions.length;
        this.tableOptions["start"] = start;
        this.renderData(this.tableOptions, this.filters);
    }

    setPageLength(value) {
        console.log(value);
        this.tableOptions.length = Number(value);
        this.renderData(this.tableOptions, this.filters);
    }

    applyFilter() {
        this.tableOptions.columns = this.prepareFilter(this.filterForm.value);
        this.renderData(this.tableOptions, this.filters);
    }

    prepareFilter(valuesObj) {
        let cols: DataTableColumn[] = this.tableOptions.columns;
        let newCols: any;
        console.log('Data: ', valuesObj);
        console.log('Columns: ', cols);

        newCols = cols.map((col) => {
            console.log(col);
            col.search = { value: '', regex: false };
            col.searchable = false;

            for (let key in valuesObj) {
                if (col.name.toLowerCase() == key && valuesObj[key]) {
                    col.search = { value: valuesObj[key], regex: true };
                    col.searchable = true;
                }
            }
            return col;
        });
        console.log('data columns: ', newCols);

        return newCols;
    }

    resetFilters() {
        this.filterForm.reset();
        this.applyFilter();
    }


    select(row) {
        console.log('row clicked>>>', row);
        this.response.emit(row);

        this.dialogRef.close(row);

    }

    closeModal() {
        this.resetFilters();
        this.dialogRef.close();
    }

    testTableOptions() {
        return {
            draw: 1,
            columns: [
                {
                    "data": "pro.id", "name": "ID",
                    "searchable": false, "orderable": true, "visible": false,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "pro.proposal_number as shumara", "name": "SHUMARA",
                    "searchable": false, "orderable": false, "visible": true,
                    "search": { "value": "", "searchable": false, "regex": false }
                },
                {
                    "data": "pro.proposal_date as pro_date", "name": "PRO_DATE",
                    "searchable": false, "orderable": false, "visible": true,
                    "search": { "value": "", "searchable": false, "regex": false }
                },
                {
                    "data": "pro.summary", "name": "SUMMARY",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "pro.objective", "name": "OBJECTIVE",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                }
            ],
            "order": [{ "column": 0, "dir": "DESC" }],
            "start": 0,
            "length": 10,
            "search": { "value": "", "regex": false }
        }
    }
    private _lb(colEn, colPs, colDr) {
        let language = 'dr'
        switch (language) {
            case 'en':
                return colEn;
            case 'ps':
                return colPs;
            case 'dr':
                return colDr;
            default:
                return colEn;
        }
    }

}
