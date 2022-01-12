import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DocumentService } from 'app/taqnin/document/document.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-document-delete',
  templateUrl: './document-delete.component.html',
  styleUrls: ['./document-delete.component.scss']
})
export class DocumentDeleteComponent implements OnInit {
@Input() data;
@Output() documentDeleteEventEmitter = new EventEmitter<Object>();
  constructor(
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private service:DocumentService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }



  deleteRecord() {
    const recordId = this.data;
    this.service.deleteDocument(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.documentDeleteEventEmitter.emit(response);
        this.spinner.hide();
        this.activeModal.close();
        this.router.navigate(['documents']);

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
