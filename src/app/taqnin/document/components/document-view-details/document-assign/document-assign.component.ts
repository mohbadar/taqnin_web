import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DecisionService } from 'app/taqnin/decision/decision.service';
import { DocumentService } from 'app/taqnin/document/document.service';
import { WorkflowService } from 'app/taqnin/workflow/workflow.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-document-assign',
  templateUrl: './document-assign.component.html',
  styleUrls: ['./document-assign.component.scss']
})
export class DocumentAssignComponent implements OnInit {
  @Output() assignDocumentEventEmitter = new EventEmitter<Object>();
  @Input() data;
  loading = false;
  modelType: boolean = false;
  openFile = false;
  decisions;
  workflows;
  steps;
  documentId;
  editForm;
  attachmentFile: any;

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

  fileChangeListener(event) {
		if (event != null) {
			if (event.target.files && event.target.files[0]) {
				this.attachmentFile = event.target.files[0];
				document.getElementById('fileName').innerHTML = event.target.files[0].name;
			}
		}
		else {
			document.getElementById('fileName').innerHTML = null;
		}
	}

	submit() {
		if (this.editForm.valid) {
			this.spinner.show();

      const formData = new FormData();
			formData.append('avatar', this.attachmentFile);
			formData.append('data', JSON.stringify(this.editForm.value));
      console.log("Form Data: ", formData);
			this.documentService.assignDocument(this.documentId, formData).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.assignDocumentEventEmitter.emit(response);
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
