
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from 'app/admin/user/user.service';

import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DepartmentService } from 'app/taqnin/department/department.service';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../../document.service';

@Component({
  selector: 'app-document-department-list',
  templateUrl: './document-department-list.component.html',
  styleUrls: ['./document-department-list.component.scss']
})
export class DocumentDepartmentListComponent implements OnInit {
  @Output() orderCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  @Input() resolution;
  ColumnMode = ColumnMode;
  createForm: FormGroup;
  editForm: FormGroup;

  departmentId: any;
  documentId: any;

  showDepartmentList = true;
  showCreateDepartmentForm = false;
  rows = [];
  showEditDepartmentForm = false;
  departments;
  users;

  constructor(
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,

    private documentService: DocumentService,

    public globals: Globals,
    private userService: UserService,
    private departmentService: DepartmentService,
    private dateConvert: DateConvertService,
  ) { }

  ngOnInit(): void {

     this.documentId = this.data

    this.getDepartmentsList(this.data);

    this.getDepartments();
    this.getUsers();
  }

  buildForm() {
    this.createForm = this.formBuilder.group({
      receiveDate: [null, Validators.required],
      user_id: [null, Validators.required],
      department_id: [null, Validators.required],
      description: [null],
    });
  }

  getDepartmentsList(documentId) {
    this.documentService.getDepartmentList(documentId).subscribe((data) => {
      this.rows = data;
    });
  }

  showCreateDepartmentFormDiv() {
    this.buildForm();
    this.showCreateDepartmentForm = true;
    this.showEditDepartmentForm = false;
    this.showDepartmentList = false;
  }

  showDepartmentListDiv() {
    this.showCreateDepartmentForm = false;
    this.showEditDepartmentForm = false;
    this.showDepartmentList = true;
  }

  showEditDepartmentFormDiv(rowId) {
    this.showCreateDepartmentForm = false;
    this.showDepartmentList = false;
    this.buildEditForm(rowId);

  }

  closeModal() {
    this.activeModal.close();
  }

  buildEditForm(rowId) {
    this.spinner.show();
    this.departmentId = rowId;
    this.documentService.getDepartmentById(rowId).subscribe((data: any) => {
      console.log(rowId);
      this.editForm = this.formBuilder.group({
        editDescription: [data.description],
        editReceiveDate: [data.receiveDate == null ? null : data.receiveDate, Validators.required],
        editUser_id: [data.user_id, Validators.required],
        editDepartment_id: [data.department_id, Validators.required]
      });
      this.showEditDepartmentForm = true;
      this.spinner.hide();
    },(error) => {
      this.spinner.hide();
      this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
      console.log(error);
    });

  }

  onFormSubmit() {
    console.log(this.createForm.value);
    if (this.createForm.valid) {
      this.spinner.show();
      const {receiveDate, description, department_id, user_id } = this.createForm.value;
      const document_id = this.data
      this.documentService.addDepartment({ receiveDate, description, department_id, user_id, document_id }).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.getDepartmentsList(this.documentId);
          this.showDepartmentListDiv();
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

    if (this.createForm.invalid) {
      // To display errors below forms
      Object.keys(this.createForm.controls).forEach(field => {
        const control = this.createForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  onEditFormSubmit() {
    if (this.editForm.valid) {
      this.spinner.show();
      const {editReceiveDate,editDescription,editUser_id ,editDepartment_id } = this.editForm.value;
      this.documentService.editDepartment(this.departmentId, {
        receiveDate: editReceiveDate, user_id: editUser_id,
        department_id: editDepartment_id, description: editDescription, document_id: this.documentId
      }).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
          this.showDepartmentListDiv();
        } else {
          this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
          console.log(response);
        }
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
        console.log(error);
      });

    }

    if (this.editForm.invalid) {
      // To display errors below forms
      Object.keys(this.editForm.controls).forEach(field => {
        const control = this.editForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }


  viewDepartment() {

    this.closeModal();

  }
  getDepartments() {
    this.departmentService.getRecordList().subscribe((response) => {
      this.departments = response;
    });
  }

  getUsers() {
    this.userService.getUsersList().subscribe((response) => {
      this.users = response;
    });
  }

  deleteDepartment(id) {
    this.spinner.show();
    this.documentService.deleteDepartment(id).subscribe(() => {
      this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
      this.getDepartmentsList(this.documentId);
      this.showDepartmentListDiv();
      this.spinner.hide();
    });
  }

}
