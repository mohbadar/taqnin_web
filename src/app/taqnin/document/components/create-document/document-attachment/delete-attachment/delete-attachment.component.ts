import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DocumentService } from 'app/taqnin/document/document.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-delete-attachment',
  templateUrl: './delete-attachment.component.html',
  styleUrls: ['./delete-attachment.component.scss']
})
export class DeleteAttachmentComponent implements OnInit {
  @Output() attachmentDeleteEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private documenService:DocumentService
  ) { }

  ngOnInit(): void {
  }
  deleteRecord() {
    const recordId = this.data; 
    this.documenService.deleteDocumentAttachment(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.attachmentDeleteEventEmitter.emit(response);
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_DELETING_RECORD");
        console.log(error);
      })
  }


  closeModal() {
    this.activeModal.close();
  }
}
