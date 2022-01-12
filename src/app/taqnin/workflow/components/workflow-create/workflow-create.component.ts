import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { StepService } from 'app/taqnin/step/step.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkflowService } from '../../workflow.service';

@Component({
  selector: 'app-workflow-create',
  templateUrl: './workflow-create.component.html',
  styleUrls: ['./workflow-create.component.scss']
})
export class WorkflowCreateComponent implements OnInit {

  @Output() workflowCreateEventEmitter = new EventEmitter<Object>();
   data;
  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private service: WorkflowService,
    // private stepService:StepService
  ) { }

  ngOnInit() {
    // this.stepService.getRecordList().subscribe((response=>{
    // this.data = response;
    // }));
    this.createForm = this.formBuilder.group({
      nameEn: [null, [Validators.required]],
      nameDr: [null, [Validators.required]],
      namePs: [null, [Validators.required]],
      processDays: [null, [Validators.required]],
      serialNo: [null, []],
      // stepsIds: [null, Validators.required]
    });
  }

  onFormSubmit() {
    console.log("Form value", this.createForm.value);
		if (this.createForm.valid) {
      this.spinner.show();
      // const { nameEn, nameDr, namePs, stepsIds } = this.createForm.value;
      const { nameEn, nameDr, namePs, processDays, serialNo } = this.createForm.value;
      // this.service.createRecord({nameEn, nameDr, namePs, stepsIds}).subscribe((response) => {
        this.service.createRecord({nameEn, nameDr, namePs, processDays, serialNo}).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.workflowCreateEventEmitter.emit(response);
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
