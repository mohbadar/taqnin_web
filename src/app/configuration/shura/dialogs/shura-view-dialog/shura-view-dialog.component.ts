import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'shura-view-dialog',
  templateUrl: './shura-view-dialog.component.html',
  styleUrls: ['./shura-view-dialog.component.scss']
})
export class ShuraViewDialogComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // @Output() ministryViewEventEmitter = new EventEmitter<Object>();
  // @Input() data;

  // constructor(
  //   private activeModal: NgbActiveModal
  //   ) { }

  // ngOnInit() {
  // }

  // closeModal() {
  //   this.activeModal.close();
  // }

}
