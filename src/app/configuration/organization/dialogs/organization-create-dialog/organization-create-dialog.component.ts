import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { OrganizationService } from "../../../../services/organization.service";

@Component({
  selector: "organization-create-dialog",
  templateUrl: "./organization-create-dialog.component.html",
  styleUrls: ["./organization-create-dialog.component.scss"],
})
export class OrganizationCreateDialogComponent implements OnInit {
  @Output() organizationCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  organizationCreateForm: FormGroup;

  constructor(
    private organizationService: OrganizationService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit() {
    this.organizationCreateForm = this.formBuilder.group({
      orgType: ["", [Validators.required]],
      nameEn: ["", [Validators.required]],
      nameDr: ["", [Validators.required]],
      namePs: ["", [Validators.required]]
    });
  }

  onFormSubmit() {
		if (this.organizationCreateForm.valid) {
      this.spinner.show();
      const { orgType, nameEn, nameDr, namePs } = this.organizationCreateForm.value;
      this.organizationService.createOrganization({orgType, nameEn, nameDr, namePs}).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.organizationCreateEventEmitter.emit(response);
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(error);
      })
		}

		if (this.organizationCreateForm.invalid) {
		// To display errors below forms
		Object.keys(this.organizationCreateForm.controls).forEach(field => {
			const control = this.organizationCreateForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
  }

  closeModal() {
    this.activeModal.close();
  }
}
