import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DocumentService } from 'app/taqnin/document/document.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-document-comment',
  templateUrl: './document-comment.component.html',
  styleUrls: ['./document-comment.component.scss']
})
export class DocumentCommentComponent implements OnInit {
  @Output() documentCommentEventEmitter = new EventEmitter<Object>();
  @Input() data;
  document_Id;
  createForm;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private service: DocumentService

  ) { }

  ngOnInit(): void {
    this.document_Id = this.data;
    this.buildForm()
  }
  buildForm() {
    this.createForm = this.formBuilder.group({
      comment: [null, [Validators.required]],
    })
  }
  onFormSubmit() {
    if (this.createForm.valid) {
      this.spinner.show();
      const { comment } = this.createForm.value;
      this.service.addComment({ comment, document_Id:this.document_Id}).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.documentCommentEventEmitter.emit(response);
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(error);
      })
    }

    if (this.createForm.invalid) {
      // To display errors below forms
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
