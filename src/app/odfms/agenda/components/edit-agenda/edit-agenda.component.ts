import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgendaService } from '../../agenda.service';

@Component({
  selector: 'app-edit-agenda',
  templateUrl: './edit-agenda.component.html',
  styleUrls: ['./edit-agenda.component.scss']
})
export class EditAgendaComponent implements OnInit {
  @Output() agendaEditEventEmitter = new EventEmitter<Object>();
  @Input() data;
  editAgendaForm: FormGroup;
  shuraList;
  agendaId;
  ColumnMode = ColumnMode;
  dataTableFlag = false;
  rows = [];

  durationTypes$ = [
		{ key: "دقیقه", value: "MINUTE" },
		{ key: "ساعت", value: "HOUR" },
	];

  constructor(
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private agendaService: AgendaService,
    private formBuilder: FormBuilder,
    private dateConvert: DateConvertService,
    private router: Router,
    private activeModal: NgbActiveModal,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fillEditResolutionForm(this.data);
    this.agendaId = this.data.id;
  }

  fillEditResolutionForm(data) {
    this.editAgendaForm = this.formBuilder.group({
      agendaNo: [data.agendaNo, Validators.required],
      meetingLocation: [data.meetingLocation, Validators.required],
      meetingDuration: [data.meetingDuration, Validators.required],
      meetingDurationType: [data.meetingDurationType, Validators.required],
      meetingDate: [(data.meetingDate === null ? null : this.dateConvert.convertToDariDate(data.meetingDate)), Validators.required],
      meetingTime: [data.meetingTime, Validators.required],
      meetingStartDate: [(data.meetingStartDate === null ? null : this.dateConvert.convertToDariDate(data.meetingStartDate)), Validators.required],
      meetingStartTime: [data.meetingStartTime, Validators.required],
    });
  }

  onFormSubmit() {
    this.spinner.show();
    console.log("Agenda Form Value", this.editAgendaForm);
    if (this.editAgendaForm.valid) {
      const { agendaNo, meetingLocation, meetingDuration, meetingDurationType, meetingDate, meetingTime, meetingStartDate, meetingStartTime } = this.editAgendaForm.value;
      this.agendaService.editRecord({ agendaNo, meetingLocation, meetingDuration, meetingDurationType, meetingDate, meetingTime, meetingStartDate, meetingStartTime }, this.agendaId).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          console.log(response);
          this.activeModal.close();
          this.agendaEditEventEmitter.emit(response);
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

    if (this.editAgendaForm.invalid) {
      // To display errors below forms
      Object.keys(this.editAgendaForm.controls).forEach(field => {
        const control = this.editAgendaForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
