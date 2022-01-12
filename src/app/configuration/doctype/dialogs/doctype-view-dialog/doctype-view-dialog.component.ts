import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'doctype-view-dialog',
  templateUrl: './doctype-view-dialog.component.html',
  styleUrls: ['./doctype-view-dialog.component.scss']
})
export class DoctypeViewDialogComponent implements OnInit {
  @Output() doctypeViewEventEmitter = new EventEmitter<Object>();
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
