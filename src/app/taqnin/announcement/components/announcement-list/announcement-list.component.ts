import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementService } from '../../announcement.service';
import { AnnouncementCreateComponent } from '../../dialogs/announcement-create/announcement-create.component';
import { AnnouncementEditComponent } from '../../dialogs/announcement-edit/announcement-edit.component';
import { AnnouncementDeleteComponent } from '../announcement-delete/announcement-delete.component';
import { AnnouncementViewComponent } from '../../dialogs/announcement-view/announcement-view.component';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss']
})
export class AnnouncementListComponent implements OnInit {
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

  announcementId;

  constructor(
    public httpClient: HttpClient,
		public translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		public globals: Globals,
		private announcementService: AnnouncementService,
		private cdref: ChangeDetectorRef,
		private router: Router
  ) { }

  ngOnInit() {
		this.spinner.show();
		this.reloadData();
	}

	refresh() {
		this.reloadData();
	}


	reloadData() {
		this.loading = true;
		this.dTableFlag = false;

		this.announcementService.getRecordList().subscribe(data => {
			console.log('Announcement list: ', data);
			this.rows = data;
			this.tempRows = this.rows;
			this.dTableFlag = true;
			this.loading = false;
			this.spinner.hide();
			this.cdref.detectChanges();
			// for specific columns to be search instead of all you can list them by name
			this.columnsWithSearch = Object.keys(this.rows[0]);

		}, (err) => {
			console.log('data error: ', err);
			this.loading = false;
			this.spinner.hide();
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
			for (let i = 0; i < this.columnsWithSearch.length; i++) {
				var colValue = d[this.columnsWithSearch[i]];

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
		const modalRef = this.modalService.open(AnnouncementCreateComponent, { size: 'xl', backdrop: 'static' });
		modalRef.componentInstance.announcementCreateEventEmitter.subscribe(() => {
			this.reloadData();
		});
	}

	viewRecord(id) {
		this.spinner.show();
		this.announcementService.getRecord(id).subscribe(data => {
			console.log('you data has', data);
			const modalRef = this.modalService.open(AnnouncementViewComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
		});
	}

	editRecord(recordId) {
		this.loading = true;
		this.spinner.show();
		this.announcementService.getRecord(recordId).subscribe(data => {
			console.log('the main anncouncement returned is', data);
			const modalRef = this.modalService.open(AnnouncementEditComponent, {size: "lg"});
			modalRef.componentInstance.data = data;
      modalRef.componentInstance.announcementId = recordId;
			this.spinner.hide();
		}, error => {
			console.log('Error: ', error);
			this.spinner.hide();
		});
	}

	deleteRecord(recordId) {
		const modalRef = this.modalService.open(AnnouncementDeleteComponent);
		modalRef.componentInstance.data = recordId;
		modalRef.componentInstance.announcementDeleteEventEmitter.subscribe(() => {
			this.reloadData();
		});
	}

  back(){
    this.router.navigate([`announcements`]);
  }

}
