import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from 'app/odfms/agenda/agenda.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {
  @Output() topicEditEventEmitter = new EventEmitter<Object>();
  @Input() data;
  @Input() presenters;
  editTopicForm: FormGroup;
  topicId;
  agendaId;
  durationTypes$ = [
    { key: "دقیقه", value: "MINUTE" },
    { key: "ساعت", value: "HOUR" },
];

  constructor(
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeModal: NgbActiveModal,
    private agendaService: AgendaService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.buildForm(this.data);
    this.topicId = this.data.id;
    this.agendaId = this.data.agenda.id;
  }

  buildForm(data) {
    this.editTopicForm = this.formBuilder.group({
        subject: [data.subject, [Validators.required]],
        details: [data.details],
        presenters: [this.presenters == null ? null : this.presenters.map(presenter => presenter.name), [Validators.required]],
        presentDuration: [data.presentDuration, [Validators.required]],
        presentDurationType: [data.presentDurationType, [Validators.required]],
        discussionDuration: [data.discussionDuration, [Validators.required]],
        discussionDurationType: [data.discussionDurationType, [Validators.required]],
        inclusionReason: [data.inclusionReason]
    });
  }

  onFormSubmit() {
    console.log("Resolution Form Value", this.editTopicForm);
    if (this.editTopicForm.valid) {
      this.spinner.show();
      const { subject, details, presenters, presentDuration, presentDurationType, discussionDuration, discussionDurationType,
        inclusionReason} = this.editTopicForm.value;
      this.agendaService.editTopic({ subject, details, presenters, presentDuration, presentDurationType, discussionDuration, discussionDurationType,
        inclusionReason}, this.topicId).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
          console.log(response);
          this.topicEditEventEmitter.emit(response);
          this.closeModal();
        } else {
          this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
          console.log(response);
        }
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
        console.log(error);
      });
    }
    if (this.editTopicForm.invalid) {
      // To display errors below forms
      Object.keys(this.editTopicForm.controls).forEach(field => {
        const control = this.editTopicForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
