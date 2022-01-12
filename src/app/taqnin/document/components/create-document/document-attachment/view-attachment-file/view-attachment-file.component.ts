import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DocumentService } from 'app/taqnin/document/document.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-attachment-file',
  templateUrl: './view-attachment-file.component.html',
  styleUrls: ['./view-attachment-file.component.scss']
})
export class ViewAttachmentFileComponent implements OnInit {
  @Input() attachmentId;
  @Input() documentId;

  fileLink;
  link;
  


  constructor(
    // private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private documentService:DocumentService
 
  ) { 
  }

  ngOnInit(): void {
    this.createFileLink(this.documentId);  
  }

  createFileLink(documentId) {
    this.link = `/api/taqnin/document/downloadFile/${documentId}`; 
  }

  
  closeModal() {
      this.activeModal.close();
  }

}
