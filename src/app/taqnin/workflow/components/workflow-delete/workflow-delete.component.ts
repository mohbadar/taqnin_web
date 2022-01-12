import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkflowService } from '../../workflow.service';

@Component({
  selector: 'app-workflow-delete',
  templateUrl: './workflow-delete.component.html',
  styleUrls: ['./workflow-delete.component.scss']
})
export class WorkflowDeleteComponent implements OnInit {
  @Output() workflowDeleteEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private service: WorkflowService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit() {
 
  }

  deleteRecord() {
    const recordId = this.data;
    this.service.deleteRecord(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.workflowDeleteEventEmitter.emit(response);
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
