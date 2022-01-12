import { Attachments } from './../../../../template/inbox/inbox.model';
import { value } from './../../../../template/shared/data/dropdowns';
import { TranslatedToastrService } from './../../../../services/translated-toastr.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementService } from '../../announcement.service';

@Component({
  selector: 'app-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.scss']
})
export class AnnouncementEditComponent implements OnInit {

  @Output() accouncementEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	editForm;
  attachmentFile: any;
  filename;
  announcementId

	constructor(
		private formBuilder: FormBuilder,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private announcementService: AnnouncementService

		) {
	}

	ngOnInit() {
		this.editForm = this.formBuilder.group({
			title: [this.data.title, [Validators.required]],
			publisher: [this.data.publisher, [Validators.required]],
			body: [this.data.body, [Validators.required]],
      attachment: [this.data.attachment, []]
		  });
      this.filename = this.data.attachment;
	}

  fileChangeListener(event) {
		if(event != null)
		{
		  if (event.target.files && event.target.files[0]) {
			this.attachmentFile = event.target.files[0];
			document.getElementById('fileName').innerHTML = event.target.files[0].name;
		  }
		}
		else{
		  document.getElementById('fileName').innerHTML = null;
		}
	}

	onFormSubmit() {
    if (this.editForm.valid) {
			this.spinner.show();
			const formData = new FormData();
			formData.append('avatar', this.attachmentFile);
			formData.append('data', JSON.stringify(this.editForm.value));
			this.announcementService.updateRecord(this.announcementId, formData).subscribe((response) => {
				if (response) {
					this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
					console.log(response);
					this.spinner.hide();
        this.activeModal.close();
        this.accouncementEditEventEmitter.emit(response);
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
	}

	closeModal() {
		this.activeModal.close();
	}
}
