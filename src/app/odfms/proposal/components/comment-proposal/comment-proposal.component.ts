import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ProposalService } from '../../proposal.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'app/services/department.service';
import { UtilityService } from 'app/services/utility.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { CreateCommentProposalComponent } from './component/create-comment-proposal/create-comment-proposal.component';
import { EditCommentProposalComponent } from './component/edit-comment-proposal/edit-comment-proposal.component';

@Component({
  selector: 'app-comment-proposal',
  templateUrl: './comment-proposal.component.html',
  styleUrls: ['./comment-proposal.component.scss']
})
export class CommentProposalComponent implements OnInit {
  @Input() data;
  allComments;
  createdAt;
  

  constructor(
    private proposalService: ProposalService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private router: Router,
    private dConvert: DateConvertService,
    private deparmentService: DepartmentService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
  ) { }



  ngOnInit(): void {
    console.log("comment Data: ", this.data);
    this.loadCommentByProposal();

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
          this.loadPage();
          break;
        case 'photo':
          this.ShowSuccessToast(data.title, 'Successfully Uploaded');
          break;
        case 'document':
          this.ShowSuccessToast(data.title, 'Successfully Uploaded');
          break;
        case 'approve':
          this.ShowSuccessToast(data.title, 'Successfully_done');
          break;
      }
    }).catch(err => {
      console.log('Modal dismissed');
    });
  }


  loadPage(){
    this.loadCommentByProposal();
  }


  addComment(){
    console.log("data: ", this.data);
    this.open(this.data,CreateCommentProposalComponent, 'create','lg')
  }

  loadCommentByProposal(){
    this.proposalService.getCommentByProposal(this.data).subscribe(res=>{
      console.log("All Comments: ", res);
      this.allComments = res;
      this.ref.detectChanges();
    }, err=>{
      console.log("error comments: ", err);
      this.allComments = null;
    });
  }

  downloadAttachment(id){
    this.proposalService.downloadCommentAttachment(id);
  }


  editComment(id){
    this.proposalService.findByIdComment(id).subscribe(res=>{
      console.log("Comment Data: ", res);
      let data = res['objection'];
      console.log("Party: ", data);
      this.open(data, EditCommentProposalComponent, 'edit', 'lg');
    }, err=>{
      console.log("comment Error: ", err);
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




}
