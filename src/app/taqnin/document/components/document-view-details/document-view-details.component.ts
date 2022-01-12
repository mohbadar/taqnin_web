import { DocumentCompletedComponent } from './document-mark-completed/document-completed.component';
import { UserService } from 'app/admin/user/user.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../../document.service';
import { ApproveDocumentComponent } from './approve-document/approve-document.component';
import { DocumentAssignComponent } from './document-assign/document-assign.component';
import { DocumentCommentDeleteComponent } from './document-comment-delete/document-comment-delete.component';
import { DocumentCommentEditComponent } from './document-comment-edit/document-comment-edit.component';
import { DocumentCommentComponent } from './document-comment/document-comment.component';
import { DocumentImportExportComponent } from './document-import-export/document-import-export.component';
import {DocumentEditComponent} from './document-edit/document-edit.component'
import { DocumentDepartmentComponent } from './document-department/document-department.component';
import { DocumentHistoryComponent } from './document-history/document-history.component';
import { Globals } from 'app/_helpers/globals';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-document-view-details',
  templateUrl: './document-view-details.component.html',
  styleUrls: ['./document-view-details.component.scss']
})
export class DocumentViewDetailsComponent implements OnInit {
  documentId;
  document;
  comments;

  activeTab = "document";
	loading = true;
  isClient;
  isWorkflow;
  workflowId;
  isMoJ;
  userData;
  username;

  workflowProcessDays = 0;
  processDays = 0;
  workflowAssignedDate;
  totalProcessDays = 0;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router:Router,
		private cdref: ChangeDetectorRef,
    public globals: Globals,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      this.documentId = id;
      this.fetchDocumentData(this.documentId);
      this.getCommentList(this.documentId);

    });

    this.userService.getUser(this.globals.principal.id).subscribe((data) => {
      this.userData = data;
      if(this.userData.user.isClient){
        this.isClient = true;
      }

      if(this.userData.user.isWorkflow){
        this.isWorkflow = true;
        this.workflowId = this.userData.user.workflow.id;
      }

      if(!this.userData.user.isClient && !this.userData.user.isWorkflow){
        this.isMoJ = true;
      }

      this.username = this.userData.user.username;
      this.cdref.detectChanges();
    }, error => {
      console.log('Error: ', error);
		});

  }

  fetchDocumentData(documentId) {
    this.spinner.show();
    this.documentService.getRecordById(documentId).subscribe((response: any) => {
      this.document = response;
      this.workflowProcessDays = this.document?.workflow.processDays;
      this.workflowAssignedDate = this.document?.workflowAssignDate;
      this.calculateProcessTime(new Date(), this.workflowAssignedDate);
      this.calculateTotalProcessDays(this.document?.processStartDate, this.document?.processEndDate);
      console.log('res', response);
       this.spinner.hide();
    }, (error) => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }
  approveDocument() {
    const modalRef = this.modalService.open(ApproveDocumentComponent,{ size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = this.documentId;
    modalRef.componentInstance.approveDocumentEventEmitter.subscribe(() => {
      this.fetchDocumentData(this.documentId);
    })
  }

  assignDocument() {
    const modalRef = this.modalService.open(DocumentAssignComponent,{ size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = this.documentId;
    modalRef.componentInstance.assignDocumentEventEmitter.subscribe(() => {
      this.fetchDocumentData(this.documentId);
    })
  }

  //comment
  addComment() {
    const modalRef = this.modalService.open(DocumentCommentComponent,{ size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.data = this.documentId;
    modalRef.componentInstance.documentCommentEventEmitter.subscribe(() => {
      this.getCommentList(this.documentId);
    });
  }

  deleteComment(commentId) {
    const modalRef = this.modalService.open(DocumentCommentDeleteComponent);
    modalRef.componentInstance.data = commentId;
    modalRef.componentInstance.documentCommentDeleteEventEmitter.subscribe(() => {
      this.getCommentList(this.documentId);
    });
  }

  editComment(commentId) {
    this.documentService.getCommentById(commentId).subscribe((data)=>{
      const modalRef = this.modalService.open(DocumentCommentEditComponent, { size: 'lg'});
      modalRef.componentInstance.data = data;
      modalRef.componentInstance.documentId = this.documentId;
      modalRef.componentInstance.documentCommentEditEventEmitter.subscribe(() => {
        this.getCommentList(this.documentId);
      });
    })

  }
  getCommentList(documentId) {
     this.spinner.show();
    this.documentService.getCommentList(documentId).subscribe((response: any) => {
       this.spinner.hide();
      this.comments = response;
    });
  }
//end



transition() {
  const modalRef = this.modalService.open(DocumentImportExportComponent,{ size: 'xl', backdrop: 'static' });
  modalRef.componentInstance.documentId = this.documentId;
  // modalRef.componentInstance.documentCommentEventEmitter.subscribe(() => {
  //   this.getCommentList(this.documentId);
  // });
}


assignDepartment() {
  const modalRef = this.modalService.open(DocumentDepartmentComponent);
  modalRef.componentInstance.documentId = this.documentId;
  modalRef.componentInstance.assignDepartmentEventEmitter.subscribe(() => {
    this.fetchDocumentData(this.documentId);
  });
}

editDocument() {
  this.documentService.getRecordById(this.documentId).subscribe((data)=>{
    const modalRef = this.modalService.open(DocumentEditComponent, {size: "xl"});
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.documentEditEventEmitter.subscribe(() => {
      this.fetchDocumentData(this.documentId);
    });
  });

}
goToDocumentList(){
  this.router.navigate(['documents']);
}


  //History
  documentHistory() {
    this.documentService.getHistory(this.documentId).subscribe((response) => {
      const modalRef = this.modalService.open(DocumentHistoryComponent,{ size: 'xl', backdrop: 'static' });
      modalRef.componentInstance.data = response;
      modalRef.componentInstance.docId = this.documentId;
    });
  }

  downloadAttachement(id){ //document Id
    this.documentService.downloadAttachment(id);
  }

  calculateProcessTime(date0, date2){
    // if(this.document)
    // {
        console.log("Date Calculation section");
          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          const format = 'yyyy-MM-dd';
          //const date = new Date()
          const locale = 'en-US';
          const formattedDate:any = formatDate(date0, format, locale);

          var date1:any = new Date(formattedDate);
          var date3:any = new Date(date2);

          console.log("Date 1: ", date1);
          //var date2:any = this.document?.workflowAssignDate;// new Date(this.document?.workflowAssignDate);
          console.log("Date 2:", date3);

          var diffMs = date1 - date3;
          if(diffMs < 0 ){
            this.processDays = this.dayDiff(date1, date3) ;
          }
          else if (diffMs > 0 ){
            this.processDays = this.dayDiff(date1, date3);
          }
          //}
      // else{
      //   return null;
      // }
  }

  calculateTotalProcessDays(startDate, endDate){
        console.log("Date Calculation section");
          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          const format = 'yyyy-MM-dd';
          const date = new Date()
          const locale = 'en-US';
          const formattedDate:any = formatDate(date, format, locale);

          if(endDate != null)
          var date2:any = new Date(endDate);
          else
          var date2:any = new Date(date);

          var date1:any = new Date(startDate);

          console.log("Date 1: ", date1);
          console.log("Date 2:", date2);

          var diffMs = date2 - date1;
          if(diffMs < 0 ){
            this.totalProcessDays = this.dayDiff(date2, date1) ;
          }
          else if (diffMs > 0 ){
            this.totalProcessDays = this.dayDiff(date2, date1);
          }
      }


  dayDiff(date1:Date, date2:Date)
  {
    var diff = Math.abs(date1.getTime() - date2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }



  markAsCompleted() {
    const modalRef = this.modalService.open(DocumentCompletedComponent,{ size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = this.documentId;
    modalRef.componentInstance.documentCompletedEventEmitter.subscribe(() => {
      this.fetchDocumentData(this.documentId);
    })
  }

}
