import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { StepService } from 'app/taqnin/step/step.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkflowService } from '../../workflow.service';
import { TransitionDeleteComponent } from './transition-delete/transition-delete.component';

@Component({
  selector: 'app-workflow-transition',
  templateUrl: './workflow-transition.component.html',
  styleUrls: ['./workflow-transition.component.scss']
})
export class WorkflowTransitionComponent implements OnInit {
  @Output() transitionCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  steps;
  createForm: FormGroup;
  workflow_id;

  constructor(
    private activeModal: NgbActiveModal,
    private stepService: StepService,
    private workflowService: WorkflowService,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private formBuilder: FormBuilder,


  ) { }

  ngOnInit(): void {
    this.getSteps();
    this.buildForm();
    console.log(this.data);

  }

  buildForm() {
    this.createForm = this.formBuilder.group({
      from_step_id: [null, [Validators.required]],
      to_step_id: [null, [Validators.required]],
      transition_number: [null, [Validators.required]],
      isLastTransition:[null]
    })
  }

  onFormSubmit() {
    console.log("Form value", this.createForm.value);
    if (this.createForm.valid) {
      this.spinner.show();
      const { isLastTransition, from_step_id, to_step_id, transition_number } = this.createForm.value;

      this.workflowService.createTransition({ isLastTransition,from_step_id, to_step_id, transition_number, workflow_id: this.data }).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.transitionCreateEventEmitter.emit(response);
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

  getSteps() {
    this.stepService.getRecordList().subscribe((response) => {
      this.steps = response
    });
  }
}
