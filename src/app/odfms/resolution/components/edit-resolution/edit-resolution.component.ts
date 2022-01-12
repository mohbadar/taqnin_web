import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShuraService } from 'app/configuration/shura/shura.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResolutionService } from '../../resolution.service';

@Component({
  selector: 'app-edit-resolution',
  templateUrl: './edit-resolution.component.html',
  styleUrls: ['./edit-resolution.component.scss']
})
export class EditResolutionComponent implements OnInit {
  @Output() resolutionEditEventEmitter = new EventEmitter<Object>();
  @Input() data;
  editResolutionForm: FormGroup;
  shuraList;
  resolutionId;

  constructor(
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private resolutionService: ResolutionService,
    private shuraService: ShuraService,
    private formBuilder: FormBuilder,
    private dateConvert: DateConvertService,
    private router: Router,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.fillEditResolutionForm(this.data);
    this.getShuraList();
    this.resolutionId = this.data.id;
  }

  fillEditResolutionForm(data) {
    this.editResolutionForm = this.formBuilder.group({
      resolutionNumber: [data.resolutionNumber, Validators.required],
      resolutionDate: [(data.resolutionDate === null ? null : this.dateConvert.convertToDariDate(data.resolutionDate)), Validators.required],
      shuraId: [data.shura?.id, Validators.required],
      components: [data.components, Validators.required]
    });
  }

  getShuraList() {
    this.shuraService.getShuras().subscribe((data: any) => {
      console.log("Shuras List", data);
      this.shuraList = data;
    });
  }

  onFormSubmit() {
    this.spinner.show();
    console.log("Resolution Form Value", this.editResolutionForm);
    if (this.editResolutionForm.valid) {
      const { resolutionNumber, resolutionDate, shuraId, components } = this.editResolutionForm.value;
      this.resolutionService.editRecord({ resolutionNumber, resolutionDate, shuraId, components }, this.resolutionId).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          console.log(response);
          this.activeModal.close();
          this.resolutionEditEventEmitter.emit(response);
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

    if (this.editResolutionForm.invalid) {
      // To display errors below forms
      Object.keys(this.editResolutionForm.controls).forEach(field => {
        const control = this.editResolutionForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
