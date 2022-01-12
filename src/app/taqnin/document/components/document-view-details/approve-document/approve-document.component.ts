import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationService } from 'app/services/organization.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DecisionService } from 'app/taqnin/decision/decision.service';
import { DocumentService } from 'app/taqnin/document/document.service';
import { WorkflowService } from 'app/taqnin/workflow/workflow.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-approve-document',
  templateUrl: './approve-document.component.html',
  styleUrls: ['./approve-document.component.scss']
})
export class ApproveDocumentComponent implements OnInit {

  @Output() approveDocumentEventEmitter = new EventEmitter<Object>();
  @Input() data;
  loading = false;
  openFile = false;
  documentId;
  importForm: FormGroup;
  workflows;
  decisions;

  constructor(
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private documentService: DocumentService,
    private translatedToastr: TranslatedToastrService,
    private formBuilder: FormBuilder,
    private workflowService: WorkflowService,
    private decisionService: DecisionService
  ) { }

  ngOnInit(): void {
    this.documentId = this.data;
    this.buildForm();
    this.getWorkflows();
    this.getDecisions();
  }
  buildForm() {
    this.importForm = this.formBuilder.group({
      number: [null, Validators.required],
      date: [null, Validators.required],
      workflow_id: [null, Validators.required],
      decision_id: [null, Validators.required],
      remarks: [null, null]
    });
  }
  closeModal() {
    this.activeModal.close();
  }

  changeApprove(event) {

    if (event) {
      this.openFile = true;
    }
    else {
      this.openFile = false;
    }
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
		if (this.importForm.valid) {
			this.spinner.show();
			this.documentService.approveDocument(this.documentId, this.importForm.value).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.approveDocumentEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
				this.spinner.hide();
			})
		}

		if (this.importForm.invalid) {
			// To display errors below forms
			Object.keys(this.importForm.controls).forEach(field => {
				const control = this.importForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

}
