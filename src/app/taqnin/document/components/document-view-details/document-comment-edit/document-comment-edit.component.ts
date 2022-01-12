import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DocumentService } from 'app/taqnin/document/document.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-document-comment-edit',
  templateUrl: './document-comment-edit.component.html',
  styleUrls: ['./document-comment-edit.component.scss']
})
export class DocumentCommentEditComponent implements OnInit {
  @Output() documentCommentEditEventEmitter = new EventEmitter<Object>();
  @Input() data;
  @Input() documentId;
createForm;

  constructor(
    private formBuilder: FormBuilder,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private documentService: DocumentService
  ) { }

  ngOnInit(): void {  
    console.log(this.documentId);
    this.createForm = this.formBuilder.group({
			comment: [this.data.comment, [Validators.required]],
		  });
  }
  onFormSubmit() {
		if (this.createForm.valid) {
			this.spinner.show();
			const { id } = this.data;
      console.log(id);
      
			const { comment} = this.createForm.value;
      const {document_Id} = this.documentId;
			this.documentService.editComment(id, {comment, document_Id}).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.documentCommentEditEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
				this.spinner.hide();
			})
		}
			
		if (this.createForm.invalid) {
			Object.keys(this.createForm.controls).forEach(field => {
				const control = this.createForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
