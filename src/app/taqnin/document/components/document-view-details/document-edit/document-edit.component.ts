import { DoctypeService } from './../../../../../services/doctype.service';
import { Organization } from './../../../../../configuration/organization/organization';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../../../document.service';
import { OrganizationService } from 'app/services/organization.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-document-edit',
	templateUrl: './document-edit.component.html',
	styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {
	@Input() data;
	@Output() documentEditEventEmitter = new EventEmitter<Object>();
	editForm: FormGroup;
	addFormSubmitted = false;
	attachmentFile: any;
	orgs;
	doctypes;
  documentId;
  fileName;

	constructor(
		public translate: TranslateService,
		private formBuilder: FormBuilder,
		private documentService: DocumentService,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private activeModal: NgbActiveModal,
		private orgService: OrganizationService,
    private router: Router,
    private doctypeService: DoctypeService
	) { }

	ngOnInit(): void {
		this.buildForm();
		this.getOrganizations();
    this.getDoctypes();
	}

	buildForm() {
    console.log("Documeent: ", this.data);
		this.documentId = this.data.id;
		this.editForm = this.formBuilder.group({
			title: [this.data.title, [Validators.required]],
			number: [this.data.number, [Validators.required]],
			date: [this.data.date, [Validators.required]],
			body: [this.data.body],
			organization_id: [this.data.organization?.id, [Validators.required]],
			doctype_id: [this.data.doctype?.id, [Validators.required]],
		});
    this.fileName = this.data.fileName;
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

	onFormSubmit() {
		if (this.editForm.valid) {
			this.spinner.show();
			const formData = new FormData();
			formData.append('avatar', this.attachmentFile);
			formData.append('data', JSON.stringify(this.editForm.value));
			this.documentService.editRecord(this.documentId,formData).subscribe((response) => {
				if (response) {
					this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
					console.log(response);
          this.router.navigate(['documents']);
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

	}

	getOrganizations() {
		this.orgService.getOrganizations().subscribe((response) => {
			this.orgs = response;
		});
	}

	closeModal() {
		this.activeModal.close();
	}

  getDoctypes(){
    this.doctypeService.getDoctypes().subscribe((response) => {
      this.doctypes = response;
    });
  }

}
