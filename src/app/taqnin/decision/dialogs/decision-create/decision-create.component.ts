import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecisionService } from '../../decision.service';

@Component({
  selector: 'app-decision-create',
  templateUrl: './decision-create.component.html',
  styleUrls: ['./decision-create.component.scss']
})
export class DecisionCreateComponent implements OnInit {

  @Output() decisionCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private decisionService: DecisionService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      nameEn: ["", [Validators.required]],
      nameDr: ["", [Validators.required]],
      namePs: ["", [Validators.required]]
    });
  }

  onFormSubmit() {
		if (this.createForm.valid) {
      this.spinner.show();
      const { nameEn, nameDr, namePs } = this.createForm.value;
      this.decisionService.createRecord({nameEn, nameDr, namePs}).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.decisionCreateEventEmitter.emit(response);
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(error);
      })
		}
	  
		if (this.createForm.invalid) {
		// To display errors below forms
		Object.keys(this.createForm.controls).forEach(field => {
			const control = this.createForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
  }

  closeModal() {
    this.activeModal.close();
  }
}
