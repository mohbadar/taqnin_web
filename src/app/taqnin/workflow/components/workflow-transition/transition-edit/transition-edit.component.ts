import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { StepService } from 'app/taqnin/step/step.service';
import { WorkflowService } from 'app/taqnin/workflow/workflow.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-transition-edit',
	templateUrl: './transition-edit.component.html',
	styleUrls: ['./transition-edit.component.scss']
})
export class TransitionEditComponent implements OnInit {
	@Output() transitionEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	editForm;
	steps;

	constructor(
		private formBuilder: FormBuilder,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private service: WorkflowService,
		private stepService: StepService

	) {
	}

	ngOnInit() {
		this.editForm = this.formBuilder.group({
			from_step_id: [this.data.fromStep.id, [Validators.required]],
			to_step_id: [this.data.toStep.id, [Validators.required]],
			transition_number: [this.data.transition_number, [Validators.required]]
		});
		this.getSteps();
	}
	onFormSubmit() {
		if (this.editForm.valid) {
			this.spinner.show();
			const { id } = this.data.id;	
			const { from_step_id, to_step_id, transition_number } = this.editForm.value;
			console.log(this.editForm.value);
			
			this.service.updateTransition(this.data.id, { from_step_id, to_step_id, transition_number }).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.transitionEditEventEmitter.emit(response);
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

	getSteps() {
		this.stepService.getRecordList().subscribe((response) => {
		  this.steps = response
		});
	}

}
