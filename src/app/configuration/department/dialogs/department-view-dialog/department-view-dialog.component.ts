import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'department-view-dialog',
  templateUrl: './department-view-dialog.component.html',
  styleUrls: ['./department-view-dialog.component.scss']
})
export class DepartmentViewDialogComponent implements OnInit {

  @Output() departmentViewEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private activeModal: NgbActiveModal
    ) { }

    ngOnInit() {
      console.log(this.data, "Data")
  }

  closeModal() {
      this.activeModal.close();
  }

}
