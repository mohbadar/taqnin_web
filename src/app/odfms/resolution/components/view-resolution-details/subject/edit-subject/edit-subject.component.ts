import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResolutionService } from 'app/odfms/resolution/resolution.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.scss']
})
export class EditSubjectComponent implements OnInit {
  @Output() subjectEditEventEmitter = new EventEmitter<Object>();
  @Input() data;
  editSubjectForm: FormGroup;
  subjectId;
  resolutionId;

  constructor(
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private resolutionService: ResolutionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.buildForm();
    this.subjectId = this.data.id;
    this.resolutionId = this.data.resolution.id;
  }

  buildForm() {
    this.editSubjectForm = this.formBuilder.group({
      subjectAbstract: [this.data.subjectAbstract, Validators.required],
      details: [this.data.details, Validators.required],
    });
  }

  onFormSubmit() {
    console.log("Resolution Form Value", this.editSubjectForm);
    if (this.editSubjectForm.valid) {
      this.spinner.show();
      const { subjectAbstract, details } = this.editSubjectForm.value;
      this.resolutionService.editSubject({ subjectAbstract, details, resolutionId: this.resolutionId}, this.subjectId).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
          console.log(response);
          this.subjectEditEventEmitter.emit(response);
          this.closeModal();
        } else {
          this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
          console.log(response);
        }
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
        console.log(error);
      });
    }
    if (this.editSubjectForm.invalid) {
      // To display errors below forms
      Object.keys(this.editSubjectForm.controls).forEach(field => {
        const control = this.editSubjectForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
