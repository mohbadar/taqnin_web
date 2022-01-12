
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/admin/user/user.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DepartmentService } from 'app/taqnin/department/department.service';

import { DocumentService } from 'app/taqnin/document/document.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-document-department',
  templateUrl: './document-department.component.html',
  styleUrls: ['./document-department.component.scss']
})
export class DocumentDepartmentComponent implements OnInit {
  @Output() assignDepartmentEventEmitter = new EventEmitter<Object>();
  @Input() documentId;
  editForm;
  departments;
  users;
  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private documentService: DocumentService,
    private translatedToastr: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getDepartments();
    this.getUsers();
  }


  buildForm() {
    this.editForm = this.formBuilder.group({
      dep_id: [null, [Validators.required]],
    })
  }


  onFormSubmit() {
    if (this.editForm.valid) {
      this.spinner.show();
      const {dep_id} = this.editForm.value;
      this.documentService.assignDepartment(this.documentId,dep_id).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.activeModal.close();
          this.assignDepartmentEventEmitter.emit(response);
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

  getDepartments() {
    this.departmentService.getRecordList().subscribe((response) => {
      this.departments = response;
    });
  }
  getUsers() {
    this.userService.getUsersList().subscribe((response) => {
      console.log(response);

      this.users = response;
    });
  }

  closeModal() {
    this.activeModal.close();
  }
}
