import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrganizationService } from '../../../../services/organization.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';



@Component({
	selector: 'organization-edit-dialog',
	templateUrl: './organization-edit-dialog.component.html',
	styleUrls: ['./organization-edit-dialog.component.scss']
})
export class OrganizationEditDialogComponent implements OnInit {
	@Output() organizationEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	organizationEditForm;

	formControl = new FormControl('', [
		Validators.required
	]);

	constructor(
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private organizationService: OrganizationService,
		private translatedToastr: TranslatedToastrService
		) {
	}

	ngOnInit() {
		this.organizationEditForm = this.formBuilder.group({
      orgType: [this.data.orgType, [Validators.required]],
			nameEn: [this.data.nameEn, [Validators.required]],
			nameDr: [this.data.nameDr, [Validators.required]],
			namePs: [this.data.namePs, [Validators.required]]
		  });
	}

	onFormSubmit() {
		if (this.organizationEditForm.valid) {
			this.spinner.show();
			const { id } = this.data;
			console.log(id);
			const { orgType, nameEn, nameDr, namePs } = this.organizationEditForm.value;

			this.organizationService.updateOrganization(id, { orgType, nameEn, nameDr, namePs }).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.organizationEditEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
				this.spinner.hide();
			})
		}

		if (this.organizationEditForm.invalid) {
			// To display errors below forms
			Object.keys(this.organizationEditForm.controls).forEach(field => {
				const control = this.organizationEditForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
