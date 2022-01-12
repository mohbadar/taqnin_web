import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResolutionService } from '../../resolution.service';
import { EditResolutionComponent } from '../edit-resolution/edit-resolution.component';
import { CreateSubjectComponent } from './subject/create-subject/create-subject.component';
import { DeleteSubjecComponent } from './subject/delete-subject/delete-subject.component';
import { EditSubjectComponent } from './subject/edit-subject/edit-subject.component';
import { ManageSubjectOrderComponent } from './subject/manage-subject-order/manage-subject-order.component';
import { ViewSubjectComponent } from './subject/view-subject/view-subject.component';

@Component({
  selector: 'app-view-resolution-details',
  templateUrl: './view-resolution-details.component.html',
  styleUrls: ['./view-resolution-details.component.scss']
})
export class ViewResolutionDetailsComponent implements OnInit {
  resolutionId;
  showResolution = false;
  resolution;
  ColumnMode = ColumnMode;
  dataTableFlag = false;
  rows = [];


  constructor(
    private resolutionService: ResolutionService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      // patch user details for edit
      this.resolutionId = id;
      this.fetchResolutionData(this.resolutionId);
      this.fetchResolutionSubject(this.resolutionId);
    });
  }

  fetchResolutionData(resolutionId) {
    this.spinner.show();
    this.resolutionService.getRecordById(resolutionId).subscribe((response: any) => {
      console.log('res', response);
      this.resolution = response;
      this.showResolution = true;
      this.spinner.hide();
      this.changeDetector.detectChanges();
    }, (error) => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }

  editResolution(recordId) {
    this.spinner.show();
    this.resolutionService.getRecordById(recordId).subscribe(data => {
      console.log('the resolution returned is', data);
      const modalRef = this.modalService.open(EditResolutionComponent);
      this.spinner.hide();
      modalRef.componentInstance.data = data;
      modalRef.componentInstance.resolutionEditEventEmitter.subscribe((updatedRecord) => {
        this.fetchResolutionData(this.resolutionId);
      })
    }, (error) => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }

  createSubject() {
    const modalRef = this.modalService.open(CreateSubjectComponent);
    modalRef.componentInstance.data = this.resolutionId;
    modalRef.componentInstance.subjectCreateEventEmitter.subscribe((createdRecord) => {
      this.fetchResolutionSubject(this.resolutionId);
    });
  }

  fetchResolutionSubject(resolutionId) {
    this.spinner.show();
    this.resolutionService.getResolutionSubjects(resolutionId).subscribe((data: any) => {
      console.log(data);
      this.rows = data;
      this.dataTableFlag = true;
      this.changeDetector.detectChanges();
      this.spinner.hide();
    }, (error) => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }

  viewSubject(recordId) {
    this.spinner.show();
    this.resolutionService.getSubjectById(recordId).subscribe(data => {
      console.log('you data has', data);
      const modalRef = this.modalService.open(ViewSubjectComponent);
      modalRef.componentInstance.data = data;
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  editSubject(recordId) {
    this.spinner.show();
    this.resolutionService.getSubjectById(recordId).subscribe(data => {
    	const modalRef = this.modalService.open(EditSubjectComponent);
    	modalRef.componentInstance.data = data;
    	modalRef.componentInstance.subjectEditEventEmitter.subscribe((updatedRecord) => {
        this.fetchResolutionSubject(this.resolutionId);
    	})
    	this.spinner.hide();
    }, error => {
    	console.log('Error: ', error);
    	this.spinner.hide();
    });
  }

  deleteSubject(recordId) {
    const modalRef = this.modalService.open(DeleteSubjecComponent, {
      centered: true
    });
    modalRef.componentInstance.data = recordId;
    modalRef.componentInstance.subjectDeleteEventEmitter.subscribe(() => {
      this.fetchResolutionSubject(this.resolutionId);
    });
  }

  manageSubjectOrder(subjectId) {
    const modalRef = this.modalService.open(ManageSubjectOrderComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.data = subjectId;
  }

  printResolution() {
    this.resolutionService.printResolution(this.resolutionId);
  }
}
