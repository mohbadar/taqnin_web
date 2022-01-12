import { DoctypeService } from './../../../../services/doctype.service';
import { Route } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationService } from 'app/services/organization.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../../document.service';


@Component({
	selector: 'app-create-taqnin-document',
	templateUrl: './create-document.component.html',
	styleUrls: ['./create-document.component.scss']
})
export class CreateTaqninDocumentComponent implements OnInit {
	newForm: FormGroup;
	addFormSubmitted = false;
	attachmentFile: any;
	orgs;
  doctypes;

	constructor(
		public translate: TranslateService,
		private formBuilder: FormBuilder,
		private documentService: DocumentService,
		private router: Router,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private modalService: NgbModal,
		private orgService: OrganizationService,
    private doctypeService: DoctypeService
	) { }


	ngOnInit(): void {
		this.buildForm();
		this.getOrganizations();
    this.getDoctypes();
	}

	buildForm() {
		this.newForm = this.formBuilder.group({
			title: [null, [Validators.required]],
			number: [null, [Validators.required]],
			date: [null, [Validators.required]],
			body: [null],
			organization_id: [null, [Validators.required]],
			doctype_id: [null, [Validators.required]],
		})
	}

	goToDocumentRoute() {
		this.router.
			navigate(['documents']);
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
		if (this.newForm.valid) {
			this.spinner.show();
			const formData = new FormData();
			formData.append('avatar', this.attachmentFile);
			formData.append('data', JSON.stringify(this.newForm.value));
			this.documentService.addRecord(formData).subscribe((response) => {
				if (response) {
					this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
					console.log(response);
					this.goToDocumentRoute();
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

	}

	getOrganizations() {
		this.orgService.getOrganizations().subscribe((response) => {
			this.orgs = response;
		});
	}

  getDoctypes(){
    this.doctypeService.getDoctypes().subscribe((response) => {
      this.doctypes = response;
    });
  }


}
