import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { DepartmentService } from "app/services/department.service";
import { TranslatedToastrService } from "app/services/translated-toastr.service";

@Component({
  selector: "department-create-dialog",
  templateUrl: "./department-create-dialog.component.html",
  styleUrls: ["./department-create-dialog.component.scss"],
})
export class DepartmentCreateDialogComponent implements OnInit {
  @Output() departmentCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  departmentCreateForm: FormGroup;

  constructor(
    private departmentService: DepartmentService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit() {
    this.departmentCreateForm = this.formBuilder.group({
      nameEn: ["", [Validators.required]],
      nameDr: ["", [Validators.required]],
      namePs: ["", [Validators.required]]
    });
  }

  onFormSubmit() {
    console.log("Department Form Value", this.departmentCreateForm);
    if (this.departmentCreateForm.valid) {
      this.spinner.show();
      const { nameEn, nameDr, namePs } = this.departmentCreateForm.value;
      this.departmentService.createDepartment({ nameEn, nameDr, namePs }).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          console.log(response);
          this.departmentCreateEventEmitter.emit(response);
          this.activeModal.close();
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
    if (this.departmentCreateForm.invalid) {
      // To display errors below forms
      Object.keys(this.departmentCreateForm.controls).forEach(field => {
        const control = this.departmentCreateForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}

