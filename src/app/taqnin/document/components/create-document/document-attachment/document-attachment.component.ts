import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DocumentService } from 'app/taqnin/document/document.service';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteAttachmentComponent } from './delete-attachment/delete-attachment.component';
import { ViewAttachmentFileComponent } from './view-attachment-file/view-attachment-file.component';

@Component({
  selector: 'app-document-attachment',
  templateUrl: './document-attachment.component.html',
  styleUrls: ['./document-attachment.component.scss']
})
export class DocumentAttachmentComponent implements OnInit {

  @Input() data;
  showAttachmentsList = true;
  showAddAttachmentForm = false;
  listOfAttachments = [];
  documentId;
  attachmentForm: FormGroup;
  rows;
  
  progress = 50;
  attachmentFileNames = {
    attachment: {
      name: null,
      type: null // can be local, server or null
    }
  };

  filesToBeUploaded = {
    attachment: {
      file: null, // File to be uploaded, null if no file is selected
      progress: 0 // for upload loading bar
    }
  };

  constructor(
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private documentService: DocumentService,
    private modalService: NgbModal,
    public globals: Globals
  ) { }

  ngOnInit(): void {
    this.documentId = this.data;
    this.getAttachmentsListByDocumentId(this.documentId);
  }

  getAttachmentsListByDocumentId(documentId) {
    this.documentService.getDocumentAttachments(documentId).subscribe((response: any) => {
      console.log('res', response);
      this.listOfAttachments = response;
      this.changeDetector.detectChanges();
    }, (error) => {
      console.log('Error: ', error);
    });
  }




  closeModal() {
    this.activeModal.close();
  }

  showAttachmentListDiv() {
    this.showAddAttachmentForm = false;
    // this.showEditCommentForm = false;
    this.showAttachmentsList = true;
  }
  
  showCreateAttachmentFormDiv() {
    this.buildAttachmentForm();
    this.showAttachmentsList = false;
    this.showAddAttachmentForm = true;
  }

  showProposalAttachmentListDiv() {
    this.showAddAttachmentForm = false;
    this.showAttachmentsList = false;
  }

  buildAttachmentForm() 
  {
    this.attachmentForm = this.formBuilder.group({
      fileName: [null, Validators.required],
      attachment: [null, Validators.required]
    });
    this.attachmentFileNames = {
      attachment: {
        name: null,
        type: null // can be local, server or null
      }
    };
  
    this.filesToBeUploaded = {
      attachment: {
        file: null, // File to be uploaded, null if no file is selected
        progress: 0 // for upload loading bar
      }
    };
    this.progress = 0;
  }

  onSelectFile(event, fileType) 
  {
    const selectedFileInput = event.target as HTMLInputElement;
    if (selectedFileInput.files && selectedFileInput.files[0]) {

      this.attachmentFileNames[fileType].name = selectedFileInput.files[0].name;
      this.attachmentFileNames[fileType].type = 'local'; // to show upload button

      console.log(selectedFileInput);

      // Update the object of files to be uploaded
      this.filesToBeUploaded[fileType].file = selectedFileInput.files[0];
      this.filesToBeUploaded[fileType].progress = 0;
    }
  }

  onFormSubmit() 
    {
      if (this.attachmentForm.valid) { 
        console.log(this.filesToBeUploaded);
        const formData = new FormData();
        formData.append('file', this.filesToBeUploaded.attachment.file);
        const fileName = this.attachmentForm.value.fileName;

        this.documentService.uploadAgendaTopicDocuments(this.documentId, fileName, formData).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.filesToBeUploaded.attachment.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            if (event !== null) {
              this.translatedToastr.success("SUCCESS", "FILE_UPLOADED_SUCCESSFULLY");
              this.showAttachmentListDiv();
            } else {
              this.progress = 0;
              this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_IN_UPLOADING_THE_FILE");
              console.log(event);
            }
          }
        },
        (error) => {
          this.progress = 0;
          console.log(error);
          this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_IN_UPLOADING_THE_FILE");
        });
      }
      if (this.attachmentForm.invalid) {
          // To display errors below forms
          Object.keys(this.attachmentForm.controls).forEach(field => {
            const control = this.attachmentForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
      }
    }

    viewFile(attachmentId) {
      const modalRef = this.modalService.open(ViewAttachmentFileComponent, { size: 'xl', backdrop: 'static' });
      modalRef.componentInstance.attachmentId = attachmentId;
      modalRef.componentInstance.documentId = this.documentId;

      // this.documentService.downloadAttachment(2,33);

    }

    viewLinkedFile(proposalLinkedAttachmentId) {
      const modalRef = this.modalService.open(ViewAttachmentFileComponent, { size: 'xl', backdrop: 'static' });
      modalRef.componentInstance.proposalLinkedAttachmentId = proposalLinkedAttachmentId;
      modalRef.componentInstance.fromProposal = true;
    }


    onDeleteAttachmentModal(agendaTopicAttachmentId) {
      const modalRef = this.modalService.open(DeleteAttachmentComponent);
      modalRef.componentInstance.data = agendaTopicAttachmentId;
      modalRef.componentInstance.attachmentDeleteEventEmitter.subscribe(() => {
        this.getAttachmentsListByDocumentId(this.documentId);
      });
    }


}
