import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AnnouncementService } from '../../announcement.service';

@Component({
  selector: 'app-announcement-details-view',
  templateUrl: './announcement-details-view.component.html',
  styleUrls: ['./announcement-details-view.component.scss']
})
export class AnnouncementDetailsViewComponent implements OnInit {

  loading;
  announcementId;

  announcement;
  announcements;

  private routeSub: Subscription;

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
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.routeSub = this.route.params.subscribe(params => {
          this.announcementId = params['id'];
        });

        this.getAnnouncementDetails(this.announcementId);
      }
    });
   }

  ngOnInit(): void {
    this.spinner.show();
    this.routeSub = this.route.params.subscribe(params => {
      this.announcementId = params['id'];
    });

    this.getAnnouncementDetails(this.announcementId);
  }

  refresh() {
    this.spinner.show();
    this.routeSub = this.route.params.subscribe(params => {
      this.announcementId = params['id'];
    });

    this.getAnnouncementDetails(this.announcementId);
	}

  getAnnouncementDetails(id: number){
		this.announcementService.getAnnouncementDetails(id).subscribe(res=>{
			this.announcement = res.announcement;
      this.announcements = res.list;
			console.log("announcement details: ", this.announcement);
			console.log("announcements list details: ", this.announcements);
			this.cdref.detectChanges();
		}, err=>{
			console.log("error in announcement details: ", err);
		});
  }

  back(){
    this.router.navigate([`announcements`]);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getDetails(id: number){
    this.routeSub = this.route.params.subscribe(params => {
      this.announcementId = params['id'];
    });

    this.ngOnInit();
  }

  downloadAttachment(id){
    this.announcementService.downloadAttachment(id);
  }

}
