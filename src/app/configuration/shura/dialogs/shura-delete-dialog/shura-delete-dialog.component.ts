import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "shura-delete-dialog",
  templateUrl: "./shura-delete-dialog.component.html",
  styleUrls: ["./shura-delete-dialog.component.scss"],
})
export class ShuraDeleteDialogComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  // @Output() ministryDeleteEventEmitter = new EventEmitter<Object>();
  // @Input() data;

  // constructor(
  //   private ministryService: MinistryService,
  //   private translate: TranslateService,
  //   private formBuilder: FormBuilder,
  //   public activeModal: NgbActiveModal,
  //   private spinner: NgxSpinnerService,
  //   private translatedToastr: TranslatedToastrService
  // ) { }

  // ngOnInit() {
  //   console.log(this.data);
  // }

  // deleteRecord() {
  //   const recordId = this.data;
  //   this.ministryService.deleteRecord(recordId).subscribe((response) => {
  //       this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
  //       this.spinner.hide();
  //       this.activeModal.close();
  //       this.ministryDeleteEventEmitter.emit(response);
  //     }, (error) => {
  //       this.spinner.hide();
  //       this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_DELETING_RECORD");
  //       console.log(error);
  //     })
  // }

  // closeModal() {
  //   this.activeModal.close();
  // }
}
