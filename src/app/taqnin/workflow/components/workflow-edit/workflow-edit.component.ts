import { StepService } from './../../../step/step.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkflowService } from '../../workflow.service';

@Component({
  selector: 'app-workflow-edit',
  templateUrl: './workflow-edit.component.html',
  styleUrls: ['./workflow-edit.component.scss']
})
export class WorkflowEditComponent implements OnInit {
  @Output() workflowEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	editForm;
  // steps$;
	constructor(
		private formBuilder: FormBuilder,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr:TranslatedToastrService,
		private service: WorkflowService,
		// private stepService: StepService
		) {
	}

	ngOnInit() {
    // this.stepService.getRecordList().subscribe((response=>{
    //   this.steps$ = response;
    //   }));

		this.editForm = this.formBuilder.group({
			nameEn: [this.data.nameEn, [Validators.required]],
			nameDr: [this.data.nameDr, [Validators.required]],
			namePs: [this.data.namePs, [Validators.required]],
      processDays: [this.data.processDays, [Validators.required]],
			serialNo: [this.data.serialNo, []],
			// stepsIds:  [this.data.steps.map(item => item.id), Validators.required],
		  });
	}

	onFormSubmit() {
    console.log("Form value", this.editForm.value);
		if (this.editForm.valid) {
			this.spinner.show();
			const { id } = this.data;
			// const { nameEn, nameDr, namePs, stepsIds } = this.editForm.value;
			const { nameEn, nameDr, namePs, processDays, serialNo } = this.editForm.value;
      console.log(this.editForm.value);

			// this.service.updateRecord(id, { nameEn, nameDr, namePs, stepsIds}).subscribe((response) => {
        this.service.updateRecord(id, { nameEn, nameDr, namePs, processDays, serialNo}).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.workflowEditEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
				this.spinner.hide();
			})
		}

		if (this.editForm.invalid) {
			// To display errors below forms
			Object.keys(this.editForm.controls).forEach(field => {
				const control = this.editForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
