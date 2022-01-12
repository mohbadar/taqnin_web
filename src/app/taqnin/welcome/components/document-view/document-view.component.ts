import { DocumentService } from './../../../document/document.service';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateConvertService } from 'app/services/date-convert.service';
import { Globals } from 'app/_helpers/globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit {
  documentId;
  document;
  lang;

  constructor(
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private documentService: DocumentService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router,
    private dateConverter: DateConvertService,
    private route: ActivatedRoute,
    public globals: Globals)
  {
    this.documentId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.setDirection();
    this.fetchDocumentData(this.documentId);
  }

  fetchDocumentData(documentId) {
    this.spinner.show();
    this.documentService.getDocuementDtoById(documentId).subscribe((response: any) => {
      this.document = response;
      console.log('res',response);
      this.spinner.hide();
    }, (error) => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }

  setDirection(){
    if(localStorage.getItem('lang') == "en"){
      this.lang = "ltr";
    }else{
      this.lang = "rtl";
    }
  }

  documentsList(){
    this.router.navigate([`welcome`]);
  }

  // downloadAttachment(id) {
  //   console.log(id);
  //   this.documentService.downloadAttachment(id);
  // }

}
