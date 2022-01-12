import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DocumentService } from 'app/taqnin/document/document.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-document-comment-delete',
  templateUrl: './document-comment-delete.component.html',
  styleUrls: ['./document-comment-delete.component.scss']
})
export class DocumentCommentDeleteComponent implements OnInit {
@Input() data;
@Output() documentCommentDeleteEventEmitter = new EventEmitter<Object>();
  constructor(
    private documentService:DocumentService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit(): void {
  }

  deleteRecord() {
    const recordId = this.data;
    this.spinner.show()
    this.documentService.deleteComment(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.documentCommentDeleteEventEmitter.emit(response);
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
