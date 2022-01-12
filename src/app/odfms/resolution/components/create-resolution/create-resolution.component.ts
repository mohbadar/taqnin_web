import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShuraService } from 'app/configuration/shura/shura.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResolutionService } from '../../resolution.service';

@Component({
  selector: 'app-create-resolution',
  templateUrl: './create-resolution.component.html',
  styleUrls: ['./create-resolution.component.scss']
})
export class CreateResolutionComponent implements OnInit {
  createResolutionForm: FormGroup;
  shuraList;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private resolutionService: ResolutionService,
    private shuraService: ShuraService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getShuraList();
  }

  buildForm() {
    this.createResolutionForm = this.formBuilder.group({
      resolutionNumber: [null, Validators.required],
      resolutionDate: [null, Validators.required],
      shuraId: [null, Validators.required],
      components: [null, Validators.required]
    });
  }

  getShuraList() {
    this.shuraService.getShuras().subscribe((data: any) => {
      console.log("Shuras List", data);
      this.shuraList = data;
    });
  }

  onFormSubmit() {
    console.log("Resolution Form Value", this.createResolutionForm);
    if (this.createResolutionForm.valid) {
      this.spinner.show();
      const { resolutionNumber, resolutionDate, shuraId, components } = this.createResolutionForm.value;
      this.resolutionService.addResolution({ resolutionNumber, resolutionDate, shuraId, components }).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          console.log(response);
          this.goToResolutions();
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

    if (this.createResolutionForm.invalid) {
      // To display errors below forms
      Object.keys(this.createResolutionForm.controls).forEach(field => {
        const control = this.createResolutionForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  goToResolutions() {
    this.router.navigate([`resolutions/`]);
  }
}
