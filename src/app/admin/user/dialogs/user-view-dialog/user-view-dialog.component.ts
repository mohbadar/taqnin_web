import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../user.service';

@Component({
  selector: 'user-view-dialog',
  templateUrl: './user-view-dialog.component.html',
  styleUrls: ['./user-view-dialog.component.scss']
})
export class UserViewDialogComponent implements OnInit {
	@Output()
	toggleModal = new EventEmitter<Object>();
	@Input() data;
	title;

	constructor(
		public userService: UserService,
		public activeModal: NgbActiveModal
		) { }

	ngOnInit() {
		this.title = this.data.job != null ? this.data.job.title : "";
		console.log(this.data);
	 }

	closeModal() {
		this.activeModal.close();
	}
}
