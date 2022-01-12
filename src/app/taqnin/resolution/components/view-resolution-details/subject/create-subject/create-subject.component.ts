import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResolutionService } from 'app/odfms/resolution/resolution.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent implements OnInit {
  @Output() subjectCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  createSubjectForm: FormGroup;
  resolutionId: any;

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
    // this.getShuraList();
    this.resolutionId = this.data;
  }

  buildForm() {
    this.createSubjectForm = this.formBuilder.group({
      subjectAbstract: [null, Validators.required],
      details: [null, Validators.required],
    });
  }

  onFormSubmit() {
    console.log("Resolution Form Value", this.createSubjectForm);
    if (this.createSubjectForm.valid) {
      this.spinner.show();
      const { subjectAbstract, details } = this.createSubjectForm.value;
      this.resolutionService.addSubject({ subjectAbstract, details, resolutionId: this.resolutionId }).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          console.log(response);
          this.subjectCreateEventEmitter.emit(response);
          this.closeModal();
        } else {
          this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(response);
        }
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(error);
      });
    }
    if (this.createSubjectForm.invalid) {
      // To display errors below forms
      Object.keys(this.createSubjectForm.controls).forEach(field => {
        const control = this.createSubjectForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
