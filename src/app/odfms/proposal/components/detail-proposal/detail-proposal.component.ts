import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ProposalService } from '../../proposal.service';
import { Globals } from 'app/_helpers/globals';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProfileService } from 'app/profile/profile.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { EditProposalComponent } from '../edit-proposal/edit-proposal.component';
import { UploadProposalComponent } from '../upload-proposal/upload-proposal.component';

@Component({
  selector: 'app-detail-proposal',
  templateUrl: './detail-proposal.component.html',
  styleUrls: ['./detail-proposal.component.scss']
})
export class DetailProposalComponent implements OnInit {
  proposalId;
  data;
  loading  = false;
  activeTab = "general";
  allDocuments;
  recordDocument;



  constructor(
    private ref: ChangeDetectorRef,
    private proposalService: ProposalService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    public globals: Globals,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private translatedToastr: TranslatedToastrService,
    private route: ActivatedRoute,
    private dateConvert: DateConvertService
  ) {
    this.proposalId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    console.log("proposalId: ", this.proposalId);
    this.loadMainData();
  }

  loadMainData(){
    this.spinner.show();
    this.proposalService.getRecordById(this.proposalId).subscribe(res=>{
        this.data = res['objection'];
        console.log("proposal data: ", this.data);
        this.spinner.hide();
        this.ref.detectChanges();
        this.loading = true;
    }, err=>{
      console.log("proposal error: ", err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  open(surveyData, component, cType = 'other', size = 'lg') {
    const modalRef = this.modalService.open(component, {
      centered: true,
      size: <any>size,
      backdrop: cType == 'view' ? true : 'static',
      keyboard: cType == 'view' ? true : false
    });
    if (surveyData) {
      modalRef.componentInstance.data = surveyData;
    }

    modalRef.result.then(data => {
      switch (data.type) {
        case 'edit':
          this.ShowSuccessToast(data.title, 'Successfully edited');
          this.loadPage();
          break;
        case 'create':
          this.ShowSuccessToast(data.title, 'Successfully created');
          break;
        case 'photo':
          this.ShowSuccessToast(data.title, 'Successfully Uploaded');
          break;
        case 'document':
          this.ShowSuccessToast(data.title, 'Successfully Uploaded');
          this.loadProposalDocument();
          break;
        case 'approve':
          this.ShowSuccessToast(data.title, 'Successfully_done');
          break;
      }
    }).catch(err => {
      console.log('Modal dismissed');
    });
  }


  editProposal(id){
    this.proposalService.getRecordById(id).subscribe(res => {
      let data = res['objection'];
      console.log("Medal: ", data);
      this.open(data, EditProposalComponent, 'edit', 'xl');

    }, err => {
      console.log("error in finding Honorary: ",);
    });

  }

  loadPage(){
    this.loadMainData();
  }

  addDocument(){
    console.log("data: ", this.data);
    this.open(this.data.id,UploadProposalComponent, 'edit','lg')
  }

  loadProposalDocument(){
    this.proposalService.getDocumentByProposal(this.data.id).subscribe(res=>{
      console.log("document data: ", res);
      this.allDocuments = res;
      this.ref.detectChanges();
    }, err=>{
      console.log("document error: ", err);
      this.allDocuments = null;
    });
  }


  ShowSuccessToast(title, message) {
    const header = this.translate.instant(title);
    const msg = this.translate.instant(message);
    this.toastr.success(msg, header, {
      positionClass: 'toast-top-left',
    });
  }

  ShowErrorToast(title, message) {
    const header = this.translate.instant(title);
    const msg = this.translate.instant(message);
    this.toastr.error(msg, header, {
      positionClass: 'toast-top-left',
    });
  }

  downloadAttachment(id) {
    console.log(id);
      this.proposalService.downloadProposalAttachment(id);
  }


  deleteDocument(){
    console.log("delete document", this.recordDocument);
    this.proposalService.deleteDocument(this.recordDocument).subscribe(res=>{
        this.ShowSuccessToast("DOCUMENT","DELETED_SUCCESSFULLY");
        this.loadProposalDocument();
        this.ref.detectChanges();
    }, err=>{
        this.ShowErrorToast("DOCUMENT","FAILED_DELETE");
    });
  }

  confirmDeleteModal(content, id) {
		this.recordDocument = id;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  
    

    goToProposals() {
      this.router.navigate([`proposal/`]);
    }
  
}
