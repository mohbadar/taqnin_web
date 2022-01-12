import { DecisionService } from './../../../../decision/decision.service';
import { WorkflowService } from './../../../../workflow/workflow.service';
import { TranslatedToastrService } from './../../../../../services/translated-toastr.service';
import { DocumentService } from './../../../document.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-document-assign',
  templateUrl: './document-completed.component.html',
  styleUrls: ['./document-completed.component.scss']
})
export class DocumentCompletedComponent implements OnInit {
  @Output() documentCompletedEventEmitter = new EventEmitter<Object>();
  @Input() data;
  loading = false;
  modelType: boolean = false;
  openFile = false;
  decisions;
  workflows;
  steps;
  documentId;
  editForm;
  constructor(
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private documentService: DocumentService,
    private translatedToastr: TranslatedToastrService,
    private workflowService:WorkflowService,
    private formBuilder: FormBuilder,
    private decisionService:DecisionService,
  ) { }

  ngOnInit(): void {
    this.documentId = this.data;
    this.buildForm();
    this.getDecisions();
    this.getWorkflows();
  }

	buildForm() {
		this.editForm = this.formBuilder.group({
			decision_id: [null, [Validators.required]],
			workflow_id: [null, [Validators.required]],
			number: [null, [Validators.required]],
			date: [null, [Validators.required]],
      remarks: [null, null]
		})
	}

  getDecisions() {
    this.decisionService.getRecordList().subscribe((response) => {
      this.decisions = response;
    });
  }

  getWorkflows() {
    this.workflowService.getRecordList().subscribe((response) => {
      this.workflows = response;
    });
  }
	submit() {
		if (this.editForm.valid) {
			this.spinner.show();
			this.documentService.documentCompletion(this.documentId, this.editForm.value).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.documentCompletedEventEmitter.emit(response);
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
