import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DoctypeService } from '../../../../services/doctype.service';
import { TranslatedToastrService } from '../../../../services/translated-toastr.service';



@Component({
	selector: 'doctype-edit-dialog',
	templateUrl: './doctype-edit-dialog.component.html',
	styleUrls: ['./doctype-edit-dialog.component.scss']
})
export class DoctypeEditDialogComponent implements OnInit {
	@Output() doctypeEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	doctypeEditForm;

	formControl = new FormControl('', [
		Validators.required
	]);

	constructor(
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private doctypeService: DoctypeService,
		private translatedToastr: TranslatedToastrService
		) {
	}

	ngOnInit() {
		this.doctypeEditForm = this.formBuilder.group({
			nameEn: [this.data.nameEn, [Validators.required]],
			nameDr: [this.data.nameDr, [Validators.required]],
			namePs: [this.data.namePs, [Validators.required]]
		  });
	}

	onFormSubmit() {
		if (this.doctypeEditForm.valid) {
			this.spinner.show();
			const { id } = this.data;
			console.log(id);
			const { nameEn, nameDr, namePs } = this.doctypeEditForm.value;

			this.doctypeService.updateDoctype(id, { nameEn, nameDr, namePs }).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.doctypeEditEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
				this.spinner.hide();
			})
		}

		if (this.doctypeEditForm.invalid) {
			// To display errors below forms
			Object.keys(this.doctypeEditForm.controls).forEach(field => {
				const control = this.doctypeEditForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
