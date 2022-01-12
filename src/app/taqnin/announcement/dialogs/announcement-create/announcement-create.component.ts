import { TranslatedToastrService } from './../../../../services/translated-toastr.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementService } from '../../announcement.service';

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.scss']
})
export class AnnouncementCreateComponent implements OnInit {

  @Output() announcementCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  createForm: FormGroup;
  attachmentFile: any;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      publisher: ["", [Validators.required]],
      body: ["", [Validators.required]]
    });
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
		if (this.createForm.valid) {
			this.spinner.show();
			const formData = new FormData();
			formData.append('avatar', this.attachmentFile);
			formData.append('data', JSON.stringify(this.createForm.value));
			this.announcementService.addRecord(formData).subscribe((response) => {
				if (response) {
					this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
					console.log(response);
					this.spinner.hide();
        this.activeModal.close();
        this.announcementCreateEventEmitter.emit(response);
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
