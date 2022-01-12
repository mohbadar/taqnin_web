import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { DoctypeService } from "../../../../services/doctype.service";
import { TranslatedToastrService } from "../../../../services/translated-toastr.service";

@Component({
  selector: "doctype-create-dialog",
  templateUrl: "./doctype-create-dialog.component.html",
  styleUrls: ["./doctype-create-dialog.component.scss"],
})
export class DoctypeCreateDialogComponent implements OnInit {
  @Output() doctypeCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  doctypeCreateForm: FormGroup;

  constructor(
    private doctypeService: DoctypeService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit() {
    this.doctypeCreateForm = this.formBuilder.group({
      nameEn: ["", [Validators.required]],
      nameDr: ["", [Validators.required]],
      namePs: ["", [Validators.required]]
    });
  }

  onFormSubmit() {
		if (this.doctypeCreateForm.valid) {
      this.spinner.show();
      const { nameEn, nameDr, namePs } = this.doctypeCreateForm.value;
      this.doctypeService.createDoctype({nameEn, nameDr, namePs}).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.doctypeCreateEventEmitter.emit(response);
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(error);
      })
		}

		if (this.doctypeCreateForm.invalid) {
		// To display errors below forms
		Object.keys(this.doctypeCreateForm.controls).forEach(field => {
			const control = this.doctypeCreateForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
  }

  closeModal() {
    this.activeModal.close();
  }
}
