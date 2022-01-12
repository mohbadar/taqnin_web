import { ComplaintService } from './../../services/complaint.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ChangeDetectionStrategy,EventEmitter, Output, Input } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DateConvertService } from 'app/services/date-convert.service';

@Component({
  selector: 'app-edit-complaint',
  templateUrl: './edit-complaint.component.html',
  styleUrls: ['./edit-complaint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComplaintComponent implements OnInit {
	@Output() complaintEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
  editForm: FormGroup;
  editComplaintSubmitted = false;
  attachment;
  fileName;
  fileAttachName;
  attachments = {};
  modelType = 'Edit';
  DocsType$;
  allDocs;


  profileCodeEntry: boolean = false;
  uploadObjection: boolean = false;
  uploadComplaint: boolean = false;
  uploadComplaintOnBoard: boolean = false;
  uploadCourtDirective: boolean = false;
  uploadCommissionDecision: boolean = false;
  uploadAuthorityResponse: boolean = false;

  constructor(
      private activeModal: NgbActiveModal,
      private formBuilder : FormBuilder,
      private complaintService: ComplaintService,
      private spinner: NgxSpinnerService,
      private toaster : ToastrService,
      private dConvert: DateConvertService,
      private translate : TranslateService,
      private translatedToastr: TranslatedToastrService
     ) 
     { }

  ngOnInit(): void {
    this.fileName = "DOCUMENT";

    this.getDocsType();
    this.buildForm();
    this.checkProfileCodeToggle();
  }

  submitEdit(){
    this.editComplaintSubmitted = true;
    this.showSuccessToast('EDIT_COMPLAINT', 'SUCCESS_MSG')
  }

  buildForm(){
    this.editForm = this.formBuilder.group({
      firstName: [this.data.name, [Validators.required]],
      lastName: [this.data.lastName, [Validators.required]],
      fatherName: [this.data.fatherName, [Validators.required]],
      entryNumber: [this.data.entryNumber, [Validators.required]],
      typeOfComplaint: [this.data.complaintType, [Validators.required]],
      typeOfDocuments: [this.data.complaintDocsType.id, [Validators.required]],
      complaintDate: [(this.data.complaintDate === null? null: this.dConvert.convertToDariDate(this.data.complaintDate)), [Validators.required]],
      accused: [this.data.accused, [Validators.required]],
      explanations: [this.data.explanations, [Validators.required]],
      profileCode: [this.data.profileCode],
      theObjectionAttach: [null],
      complaintForRespAttach: [null],
      complaintForBoardAttach: [null],
      courtDirecAttach: [null],
      comissionDecAttach: [null],
      relatedAuthorityAttach: [null],
    });
  }

  onFormSubmit() {
		if (this.editForm.valid) {
			this.spinner.show();
			const { id } = this.data;
      const { firstName, lastName, fatherName, entryNumber, typeOfComplaint, typeOfDocuments,
              complaintDate, accused, explanations, profileCode } = this.editForm.value;
      console.log(this.editForm.value);
			this.complaintService.updateComplaintById(id, {name: firstName, lastName, fatherName, entryNumber, complaintDocsType: typeOfDocuments, complaintType: typeOfComplaint,
        complaintDate, accused, explanations, profileCode}).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.complaintEditEventEmitter.emit(response);
			}, (error) => {
        this.spinner.hide();
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
			})
		}
			
		if (this.editForm.invalid) {
			// To display errors below forms
			Object.keys(this.editForm.controls).forEach(field => {
				const control = this.editForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}


   getDocsType(){
     this.DocsType$ =  this.complaintService.getComplaintDocsType();
     this.DocsType$.subscribe(res =>{
     this.allDocs = res;  
   
 } );
  }


  // Turn profile code on if complanit has any profileCode  data
  checkProfileCodeToggle() {
    if (this.editForm.value.profileCode) {
      this.profileCodeEntry = true;
      console.log(this.profileCodeEntry);
    }
  }

  // onSelectFile(event, fileType) {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     this.attachment = event.target.files[0];
  //     this.fileAttachName = event.target.files[0].name;

  //     const obj = {
  //       fileType: fileType,
  //       file: event.target.files[0],
  //       fileName: event.target.files[0].name,
  //     };
  //     this.attachments[fileType] = obj;

  //     console.log("File name Object:", obj);
  //   }
  // }

  // onFileChange(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.fileName = event.target.files[0].name;
  //     this.editForm.patchValue({
  //       fileSource: file,
  //     });
  //   }
  // }



  onObjectionUpload(event) {
    event ? (this.uploadObjection = true) : (this.uploadObjection = false);

    // this.onSelectFile(event, null);
  }

  onComplaintUpload(event) {
    event ? (this.uploadComplaint = true) : (this.uploadComplaint = false);
  }

  onComplaintForBoard(event) {
  
    event
      ? (this.uploadComplaintOnBoard = true)
      : (this.uploadComplaintOnBoard = false);
  }

  onCourtDirective(event) {

    event
      ? (this.uploadCourtDirective = true)
      : (this.uploadCourtDirective = false);
  }

  onCommissionDecision(event) {

    event
      ? (this.uploadCommissionDecision = true)
      : (this.uploadCommissionDecision = false);
  }

  onAuthorityResponse(event) {

    event
      ? (this.uploadAuthorityResponse = true)
      : (this.uploadAuthorityResponse = false);
  }

  onProfileCode(event) {
    event ? (this.profileCodeEntry = true) : (this.profileCodeEntry = false);
  }


   showErrorToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toaster.error(msg, header, {
            positionClass: 'toast-top-left',
        });
    }

    showSuccessToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toaster.success(msg, header, {
            positionClass: 'toast-top-left',
        });
    }

    closeModal() {
      this.activeModal.close();
    }
}
