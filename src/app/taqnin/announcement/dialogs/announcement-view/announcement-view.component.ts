import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-announcement-view',
  templateUrl: './announcement-view.component.html',
  styleUrls: ['./announcement-view.component.scss']
})
export class AnnouncementViewComponent implements OnInit {

  @Output() announcementViewEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,

		) {
	}

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

}
