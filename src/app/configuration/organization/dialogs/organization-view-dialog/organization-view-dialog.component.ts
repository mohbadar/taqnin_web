import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'organization-view-dialog',
  templateUrl: './organization-view-dialog.component.html',
  styleUrls: ['./organization-view-dialog.component.scss']
})
export class OrganizationViewDialogComponent implements OnInit {
  @Output() organizationViewEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private activeModal: NgbActiveModal
    ) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

}
