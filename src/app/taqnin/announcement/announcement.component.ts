import { MainAnnouncementEditComponent } from './dialogs/main-announcement-edit/main-announcement-edit.component';
import { MainAnnouncementCreateComponent } from './dialogs/main-announcement-create/main-announcement-create.component';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementService } from './announcement.service'
import { AnnouncementDeleteComponent } from './components/announcement-delete/announcement-delete.component'
import { Router } from '@angular/router';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileDownloadService } from 'app/services/file-download.service';


@Component({
	selector: 'app-announcement',
	templateUrl: './announcement.component.html',
	styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

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
  totalAnnouncements;
  mainAnnouncement;
  announcements;

  currentPage = 1;
  itemsPerPage = 8;
  pageSize: number;
  isDisabled = true;

  filterForm: FormGroup;
  filterValue;

  isCollapsed = false;

  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  public swiperVideoResultConfig: SwiperConfigInterface = {
    slidesPerView: 'auto',
    centeredSlides: false,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };


	constructor(
		public httpClient: HttpClient,
		public translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		public globals: Globals,
		private announcementService: AnnouncementService,
		private cdref: ChangeDetectorRef,
		private router: Router,
    private fb: FormBuilder,
	) { }

	ngOnInit() {
		this.spinner.show();
		this.getMainAnnouncement();
    this.loadAnnouncementsCount();
    this.getAllAnnouncements();
    this.createFilterForm();
	}

	refresh() {
		this.getMainAnnouncement();
    this.loadAnnouncementsCount();
    this.getAllAnnouncements();
    this.loading = false;
	}

  applyFilter() {
    this.spinner.show();
    this.filterValue = this.filterForm.value.query;
    console.log('Filter value: ', this.filterValue);
    this.loadFilteredAnnouncements(this.filterValue);
    this.resetFilters();
    this.spinner.hide();
  }

  resetFilters() {
    this.filterForm.reset();
    this.filterValue = null;
  }

  createFilterForm() {
		this.filterForm = this.fb.group({
			query: ""
		});
	}

  loadFilteredAnnouncements(query: any){
    this.announcementService.getAllFilteredAnnouncements(query).subscribe(res=>{
      console.log("Filtered Documents documents: ", res);
      this.announcements = res;
      this.cdref.detectChanges();
    }, err=>{
      console.log("error documents: ", err);
      this.announcements = null;
    });
  }

	// reloadData() {
	// 	this.loading = true;
	// 	this.dTableFlag = false;

	// 	this.announcementService.getRecordList().subscribe(data => {
	// 		console.log('Announcement list: ', data);
	// 		this.rows = data;
	// 		this.tempRows = this.rows;
	// 		this.dTableFlag = true;
	// 		this.loading = false;
	// 		this.spinner.hide();
	// 		this.cdref.detectChanges();
	// 		// for specific columns to be search instead of all you can list them by name
	// 		this.columnsWithSearch = Object.keys(this.rows[0]);

	// 	}, (err) => {
	// 		console.log('data error: ', err);
	// 		this.loading = false;
	// 		this.spinner.hide();
	// 	});
	// }

	// searchTerm(val) {
	// 	// filter our data
	// 	const temp = this.tempRows.filter((d) => {
	// 		console.log(d);
	// 		// single filter
	// 		// return d.name.toLowerCase().indexOf(val) !== -1 || !val;

	// 		// Multi Column Filter
	// 		// iterate through each row's column data
	// 		for (let i = 0; i < this.columnsWithSearch.length; i++) {
	// 			var colValue = d[this.columnsWithSearch[i]];

	// 			// if no filter OR colvalue is NOT null AND contains the given filter
	// 			if (!val || (!!colValue && colValue.toString().toLowerCase().indexOf(val) !== -1)) {
	// 				// found match, return true to add to result set
	// 				return true;
	// 			}
	// 		}
	// 	});

	// 	// update the rows
	// 	this.rows = temp;
	// 	// Whenever the filter changes, always go back to the first page
	// 	this.table.offset = 0;
	// }

  getAllAnnouncements(){
    this.loading = true;
		this.announcementService.getRecordList().subscribe(data => {
			console.log('Announcements list: ', data);
			this.announcements = data;
      this.cdref.detectChanges();
			this.loading = false;
			this.spinner.hide();
		}, (err) => {
			console.log('data error: ', err);
			this.loading = false;
			this.spinner.hide();
		});
  }

  addNew() {
		this.router.navigate(['announcements/create']);
		this.loading = true;
	}

  addMainAnnouncement() {
		const modalRef = this.modalService.open(MainAnnouncementCreateComponent, {size: "lg"});
		modalRef.componentInstance.mainAnnouncementCreateEventEmitter.subscribe(() => {
			this.getMainAnnouncement();
		});
	}

	editMainAnnouncement() {
    this.loading = true;
		this.spinner.show();
		this.announcementService.getMainAnnoucement().subscribe(data => {
			console.log('the main anncouncement returned is', data);
			const modalRef = this.modalService.open(MainAnnouncementEditComponent, {size: "lg"});
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, error => {
			console.log('Error: ', error);
			this.spinner.hide();
		});
	}

  getMainAnnouncement(){
    this.spinner.show();
    this.announcementService.getMainAnnoucement().subscribe((response: any) => {
      this.mainAnnouncement = response;
      console.log('main announcement res',response);
      this.spinner.hide();
    }, (error) => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }

  viewList(){
    this.router.navigate([`/announcements/list`]);
    this.loading = true;
  }

  loadAnnouncementsCount(){
		this.announcementService.getCount().subscribe(res=>{
			this.totalAnnouncements = res;
			this.cdref.detectChanges();
			console.log("total announcements: ", this.totalAnnouncements);
		}, err=>{
			console.log("error in Count: ", err);
		});
	}

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  viewAnnouncement(id){
    this.router.navigate([`announcements/view/${id}`]);
  }

  downloadMainAnnouncementAttachment(){
    this.announcementService.downloadMainAnnouncementAttachment();
  }

}
