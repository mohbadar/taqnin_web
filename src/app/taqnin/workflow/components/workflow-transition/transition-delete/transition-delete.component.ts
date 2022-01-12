import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { WorkflowService } from 'app/taqnin/workflow/workflow.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transition-delete',
  templateUrl: './transition-delete.component.html',
})
export class TransitionDeleteComponent implements OnInit {
 @Input() data;
 @Output() transitionDeleteEventEmitter = new EventEmitter<Object>();
  constructor(
    private service: WorkflowService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit(): void {
  }

  deleteRecord() {
    const recordId = this.data;
    this.service.deleteTransition(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.transitionDeleteEventEmitter.emit(response);
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_DELETING_RECORD");
        console.log(error);
      })
  }

  closeModal() {
    this.activeModal.close();
  }

}
