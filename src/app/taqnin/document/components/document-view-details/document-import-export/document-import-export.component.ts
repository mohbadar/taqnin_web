import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DocumentService } from 'app/taqnin/document/document.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-document-import-export',
  templateUrl: './document-import-export.component.html',
  styleUrls: ['./document-import-export.component.scss']
})
export class DocumentImportExportComponent implements OnInit {
@Input() documentId;

showCreateImportForm;
showImportList;  
showCreateExportForm;
showExportList;
  imports;
  exports;
  importForm:FormGroup;
  exportForm:FormGroup;
  constructor(
    private activeModal:NgbActiveModal,
    private documentService:DocumentService,
    private formBuilder:FormBuilder,
    private translatedToastr: TranslatedToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.showImportList = true;
    this.showExportList = true;
    this.buildForm();
    this.getImportList();
    this.getExportList();
  }


  buildForm(){
   this.importForm = this.formBuilder.group({
     import_number:[null,Validators.required],
     import_date:[null,Validators.required],
     body:[null],
    });
    this.exportForm = this.formBuilder.group({
      export_number:[null,Validators.required],
      export_date:[null,Validators.required],
      body:[null],
     });
  }
  showCreateImportFormDiv(){
    this.showCreateImportForm = true;
    this.showImportList = false;
    this.showExportList = false;
  }

  showImportListDiv(){
    this.showCreateImportForm = false;
    this.showImportList = true;
    this.showExportList = true;
  }

  showCreateExportFormDiv(){
    this.showCreateExportForm = true;
    this.showExportList = false;
    this.showImportList = false;
  }
  showExportListDiv(){
    this.showCreateExportForm = false;
    this.showExportList = true;
    this.showImportList = true;
  }

  getImportList(){
   this.documentService.getImportList(this.documentId).subscribe((data)=>{
    this.imports = data;
   });
  }
  getExportList(){
    this.documentService.getExportList(this.documentId).subscribe((data)=>{
     this.exports = data;
    });
   }

  createImport(){
    if(this.importForm.valid)
    {
      this.spinner.show();
      const {import_number, import_date,body} = this.importForm.value;
        this.documentService.addImport({import_number, import_date, body, document_id:this.documentId}).subscribe((response)=>{
          if (response) {
            this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
            console.log(response);
            this.getImportList();
           this.showImportListDiv();
          } else {
            this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
            console.log(response);
          }
          this.spinner.hide();
          }, (error) => {
          this.spinner.hide();
          this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(error);
          });
    }

  }
  createExport(){
    if(this.exportForm.valid)
    {
      this.spinner.show();
      const {export_number, export_date,body} = this.exportForm.value;
        this.documentService.addExport({export_number, export_date, body, document_id:this.documentId}).subscribe((response)=>{
          if (response) {
            this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
            console.log(response);
            this.getExportList();
            this.showExportListDiv();
            this.buildForm();
          } else {
            this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
            console.log(response);
          }
          this.spinner.hide();
          }, (error) => {
          this.spinner.hide();
          this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(error);
          });
    }

  }
  deleteExport(id){
    this.spinner.show();
    this.documentService.deleteExport(id).subscribe((response)=>{
      if(response)
     this.getExportList();
     this.spinner.hide();
    });
  }

  deleteImport(id){
    this.spinner.show();
    this.documentService.deleteImport(id).subscribe((response)=>{
      if(response)
     this.getImportList();
     this.spinner.hide();
    });
  }
  closeModal() {
    this.activeModal.close();
  }
}
