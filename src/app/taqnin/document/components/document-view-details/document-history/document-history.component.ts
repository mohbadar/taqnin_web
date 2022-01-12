import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from 'app/taqnin/document/document.service';

@Component({
  selector: 'app-document-history',
  templateUrl: './document-history.component.html',
  styleUrls: ['./document-history.component.scss']
})
export class DocumentHistoryComponent implements OnInit {
  @Input() data;
  docId;

  constructor(
    private documentService: DocumentService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log("history data: ", this.data);
  }

  closeModal(){
    this.activeModal.close();
  }

  downloadAttachement(id, docId){ //document Id
    this.documentService.downloadHistoryAttachment(id, docId);
  }


}
