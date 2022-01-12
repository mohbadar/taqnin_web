import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { ComplaintService } from "app/services/complaint.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { TranslatedToastrService } from "app/services/translated-toastr.service";

@Component({
  selector: "app-upload-complaint",
  templateUrl: "./upload-complaint.component.html",
  styleUrls: ["./upload-complaint.component.scss"],
})
export class UploadComplaintComponent implements OnInit {
	@Input() complaintId;
  uploadedAttachments: FormGroup;
  progress = 50;
  attachmentFileNames = {
    objectionAttachment: {
      name: null,
      type: null // can be local, server or null
    },
    complaintToResponsibleAuthorityAttachment: {
      name: null,
      type: null
    },
    complaintToBoardAttachment: {
      name: null,
      type: null
    },
    courtDecreeAttachment: {
      name: null,
      type: null // can be local, server or null
    },
    committeeDecisionAttachment: {
      name: null,
      type: null
    },
    responsibleAuthorityResponseAttachment: {
      name: null,
      type: null
    }
  };
  filesToBeUploaded = {
    objectionAttachment: {
      file: null, // File to be uploaded, null if no file is selected
      progress: 0 // for upload loading bar
    },
    complaintToResponsibleAuthorityAttachment: {
      file: null,
      progress: 0
    },
    complaintToBoardAttachment: {
      file: null,
      progress: 0
    },
    courtDecreeAttachment: {
      file: null,
      progress: 0
    },
    committeeDecisionAttachment: {
      file: null,
      progress: 0
    },
    responsibleAuthorityResponseAttachment: {
      file: null,
      progress: 0
    }
  };

    constructor(
      private formBuilder: FormBuilder,
      private activeModal: NgbActiveModal,
      private complaintService: ComplaintService,
      private translatedToastr: TranslatedToastrService
    ) {}

    ngOnInit(): void {
      this.getAllFileNames(this.complaintId);
    }

    getAllFileNames(recordId) 
    {
      this.complaintService.getAllFileNames(recordId).subscribe((data) => {
        this.buildAttachmentForm(data);
      })
    }

    buildAttachmentForm(fileNames) 
    {
      this.uploadedAttachments = this.formBuilder.group({
        objectionAttachment: [fileNames.objectionAttachment],
        complaintToResponsibleAuthorityAttachment: [fileNames.complaintToResponsibleAuthorityAttachment],
        complaintToBoardAttachment: [fileNames.complaintToBoardAttachment],
        courtDecreeAttachment: [fileNames.courtDecreeAttachment],
        committeeDecisionAttachment: [fileNames.committeeDecisionAttachment],
        responsibleAuthorityResponseAttachment: [fileNames.responsibleAuthorityResponseAttachment],
      });
      this.checkSelectedAttachmentFileNames();
    }

    checkSelectedAttachmentFileNames() {
      for (const property in this.uploadedAttachments.value) {
          this.setSelectedAttachmentFileName(property, this.uploadedAttachments.value[property]);
     }
    }

    setSelectedAttachmentFileName(formProperty, formValue) 
    {
      if (formValue !== null && formValue !== '') {
        this.attachmentFileNames[formProperty].name = formValue;
        this.attachmentFileNames[formProperty].type = 'server';
      } else {
        this.attachmentFileNames[formProperty].name = 'NO_FILE_UPLOADED';
      }
    }


    onSelectFile(event, fileType) 
    {
      const selectedFileInput = event.target as HTMLInputElement;
      if (selectedFileInput.files && selectedFileInput.files[0]) {

        this.attachmentFileNames[fileType].name = selectedFileInput.files[0].name;
        this.attachmentFileNames[fileType].type = 'local'; // to show upload button

        console.log(selectedFileInput);

        // Update the object of files to be uploaded
        this.filesToBeUploaded[fileType].file = selectedFileInput.files[0];
        this.filesToBeUploaded[fileType].progress = 0;
      }
    }

    uploadFileToServer(fileType) 
    {
      const fileData = this.filesToBeUploaded[fileType].file;

      this.complaintService.uploadComplaintDocuments(this.complaintId, fileType, fileData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.filesToBeUploaded[fileType].progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          if (event !== null) {
            this.translatedToastr.success("SUCCESS", "FILE_UPLOADED_SUCCESSFULLY");
            this.attachmentFileNames[fileType].type = 'server'; // to show download & delete button
          } else {
            this.progress = 0;
            this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_IN_UPLOADING_THE_FILE");
            console.log(event);
          }
        }
      },
      (error) => {
        this.progress = 0;
        console.log(error);
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_IN_UPLOADING_THE_FILE");
      });
    }

    downloadFile(fileType: string) {
      this.complaintService.downloadFile(this.complaintId, fileType);
    }

    deleteFile(fileType: string) {
      console.log("Delete fileType", fileType);
      this.complaintService.deleteFile(this.complaintId, fileType).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.attachmentFileNames[fileType].name = 'NO_FILE_UPLOADED';
        this.attachmentFileNames[fileType].type = null;

        // Update the object of files to be uploaded
        this.filesToBeUploaded[fileType].file = null;
        this.filesToBeUploaded[fileType].progress = 0;       
      }, (error) => {
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_DELETING_RECORD");
        console.log(error);
      })
    }

    closeModal() {
      this.activeModal.close();
    }
}
