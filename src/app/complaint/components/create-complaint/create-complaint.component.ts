import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { ComplaintService } from "./../../../services/complaint.service";
import { ViewChild } from "@angular/core";
import { WizardComponent } from "angular-archwizard";
import { Router } from "@angular/router";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslatedToastrService } from "app/services/translated-toastr.service";

@Component({
  selector: "app-create-complaint",
  templateUrl: "./create-complaint.component.html",
  styleUrls: ["./create-complaint.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComplaintComponent implements OnInit {
  @ViewChild("wizard") public wizard: WizardComponent;

  complaintForm: FormGroup;
  complaintFormSubmitted: boolean = false;
  uploadObjection: boolean = false;
  uploadComplaint: boolean = false;
  uploadComplaintOnBoard: boolean = false;
  uploadCourtDirective: boolean = false;
  uploadCommissionDecision: boolean = false;
  uploadAuthorityResponse: boolean = false;
  DocsType$;
  allDocs;
  complaintsDocsTypes;
  attachment;
  fileName;
  fileAttachName;
  attachments = {};
  dataObj;

  profileCodeEntry: boolean = false;
  buttonDisable: boolean = false;
  objecCheck: boolean = false;
  complCheck: boolean = false;
  compl4BCheck: boolean = false;
  courtCheck: boolean = false;
  comisDesCheck: boolean = false;
  disputesCommDesc: boolean = false;
  authResCheck: boolean = false;

  documentTypeNameDr;

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder,
    private complaintService: ComplaintService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private translate: TranslateService,
    private translatedToastr: TranslatedToastrService
      ) {}

  ngOnInit(): void {
    this.fileName = "DOCUMENT";

    this.getDocsType();

    this.complaintForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      fatherName: [null, [Validators.required]],
      entryNumber: [null, [Validators.required]],
      typeOfComplaint: [null, [Validators.required]],
      typeOfDocuments: ["", [Validators.required]],
      complaintDate: [null, [Validators.required]],
      accused: [null, [Validators.required]],
      explanations: [null, [Validators.required]],
      profileCode: [null]
    });
  }

  getDocsType() {
    this.spinner.show();
    this.DocsType$ = this.complaintService.getComplaintDocsType();
    this.DocsType$.subscribe((response) => {
      console.log("All docs", response);
      this.allDocs = response;
      this.spinner.hide();
    });
  }

  getDropDown() {
    this.documentTypeNameDr = this.findComplaintField(
      this.allDocs,
      this.complaintForm.get("typeOfDocuments").value
    );
    console.log("selected Type of document ", this.documentTypeNameDr);
  }

  findComplaintField(array, field) {
    if (field && array) {
      let obj = array.find((i) => i.id === field);
      return obj.nameDr;
    }
    return null;
  }

  onFormSubmit() {
    if (this.complaintForm.valid) {
      console.log("Complaint-Form:", this.complaintForm);
      this.dataObj = { ...this.complaintForm };
      this.wizard.goToNextStep();
      console.log("Custom-Data:", this.dataObj);
		}
	  
		if (this.complaintForm.invalid) {
		// To display errors below forms
		Object.keys(this.complaintForm.controls).forEach(field => {
			const control = this.complaintForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
  }

  onConfirmFormSubmit() {
    const { firstName, lastName, fatherName, entryNumber, typeOfComplaint, typeOfDocuments,
            complaintDate, accused, explanations, profileCode } = this.complaintForm.value;
    console.log(this.complaintForm.value);
    this.complaintService.createComplaint({name: firstName, lastName, fatherName, entryNumber, complaintDocsType: typeOfDocuments, complaintType: typeOfComplaint,
      complaintDate, accused, explanations, profileCode}).subscribe((response) => {
      if (response) {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        console.log(response);
        this.spinner.hide();
        this.router.navigateByUrl(`/complaints`);
      } else {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(response);
      }
    }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(error);
    });
  }

  AllComplalintDocsType() {
    this.complaintsDocsTypes = this.complaintService.getComplaintDocsType();
  }


  // onComplaintUpload(event) {
  //   this.complCheck = true;
  //   event ? (this.uploadComplaint = true) : (this.uploadComplaint = false);
  // }

  // onComplaintForBoard(event) {
  //   this.compl4BCheck = true;

  //   event
  //     ? (this.uploadComplaintOnBoard = true)
  //     : (this.uploadComplaintOnBoard = false);
  // }
  // onObjectionUpload(event) {
  //   this.objecCheck = true;
  //   event ? (this.uploadObjection = true) : (this.uploadObjection = false);

  //   this.onSelectFile(event, null);
  // }

  // onCourtDirective(event) {
  //   this.courtCheck = true;

  //   event
  //     ? (this.uploadCourtDirective = true)
  //     : (this.uploadCourtDirective = false);
  // }

  // onCommissionDecision(event) {
  //   this.comisDesCheck = true;

  //   event
  //     ? (this.uploadCommissionDecision = true)
  //     : (this.uploadCommissionDecision = false);
  // }

  // onAuthorityResponse(event) {
  //   this.authResCheck = true;

  //   event
  //     ? (this.uploadAuthorityResponse = true)
  //     : (this.uploadAuthorityResponse = false);
  // }

  onProfileCode(event) {
    event ? (this.profileCodeEntry = true) : (this.profileCodeEntry = false);
  }

  clearInput(formName, controller) {
    console.log(controller);
    formName.controls[controller].setValue("");
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

  onFileChange(event) {
    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.complaintForm.patchValue({
        fileSource: file,
      });
    }
  }

  routeComplaints() {
    this.router.navigate(["complaints"]);
  }

}
