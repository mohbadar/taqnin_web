import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'app/services/department.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';

@Component({
	selector: 'department-edit-dialog',
	templateUrl: './department-edit-dialog.component.html',
	styleUrls: ['./department-edit-dialog.component.scss']
})
export class DepartmentEditDialogComponent implements OnInit {
	@Output() departmentEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	departmentEditForm;

	formControl = new FormControl('', [
		Validators.required
	]);

	constructor(
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private departmentService: DepartmentService,
		private translatedToastr: TranslatedToastrService
		) {
	}

	ngOnInit() {
		this.departmentEditForm = this.formBuilder.group({
			nameEn: [this.data.nameEn, [Validators.required]],
			nameDr: [this.data.nameDr, [Validators.required]],
			namePs: [this.data.namePs, [Validators.required]]
		  });
	}

	onFormSubmit() {
		if (this.departmentEditForm.valid) {
			this.spinner.show();
			const { id } = this.data;
			console.log(id);
			const { nameEn, nameDr, namePs } = this.departmentEditForm.value;

			this.departmentService.updateDepartmentById(id, { nameEn, nameDr, namePs }).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.departmentEditEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
				this.spinner.hide();
			})
		}

		if (this.departmentEditForm.invalid) {
			// To display errors below forms
			Object.keys(this.departmentEditForm.controls).forEach(field => {
				const control = this.departmentEditForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
