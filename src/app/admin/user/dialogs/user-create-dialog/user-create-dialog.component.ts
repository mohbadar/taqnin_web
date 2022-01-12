import { WorkflowService } from './../../../../taqnin/workflow/workflow.service';
import { OrganizationService } from './../../../../services/organization.service';
import { Organization } from './../../../../configuration/organization/organization';
import { StepService } from './../../../../taqnin/step/step.service';
import { Component, OnInit, Inject, Input, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { UserService } from "../../user.service";
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { User } from "./../../user";
import { TranslateService } from "@ngx-translate/core";
import { Globals } from "app/_helpers/globals";
import { AuthService } from "app/template/shared/auth/auth.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { GroupService } from "app/admin/group/group.service";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { MinistryService } from "app/services/ministry.service";
import { DepartmentService } from "app/services/department.service";

@Component({
  selector: "user-create-dialog",
  templateUrl: "./user-create-dialog.component.html",
  styleUrls: ["./user-create-dialog.component.scss"],
})
export class UserCreateDialogComponent implements OnInit {
  @Output() userCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  @Input() groupData;

  userCreateForm: FormGroup;
  passwordMatch = true;
  ministries$;
  departments$;
  organizations$;
  workflows$
  showDepartmentField = false;
  isClient$ = false;
  isWorkflow$ = false;
  isAdmin$ = false;
  clinetTemp = false;

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public globals: Globals,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private ministryService: MinistryService,
    private organizationService: OrganizationService,
    private departmentService: DepartmentService,
    private changeDetectorRef: ChangeDetectorRef,
    private workflowService: WorkflowService
  ) { }

  ngOnInit() {
    console.log("USER : ", this.data);
    console.log("Groups: ", this.groupData);
    //this.getMinistries();
    this.getDepartments();
    this.getOrganizations();
    this.getWorkflows();

    this.userCreateForm = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
        username: [null, [Validators.required, Validators.minLength(3)]],
        groups: [null],
        departmentId: [null],
        phone_no: [null, [Validators.required]],
        address: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.compose([
              // 1. Password Field is Required
              Validators.required,
              Validators.minLength(8),
              // 2. check whether the entered password has capital case Letter A-Z
              this.patternValidator(/^(?=.*?[A-Z])/, { hasCapitalCase: true }),
              // 3. check whether the entered password has lower case letter a-z
              this.patternValidator(/(?=.*?[0-9])/, { hasANumber: true}),
              // 4. check whether password has a special character in it
              this.patternValidator(/(?=.*?[#?!@$%^&*-])/, { hasSpecialCharacter: true })
        ])],
        is_client: [null, [Validators.required]],
        is_workflow: [null, [Validators.required]],
        is_admin: [null, [Validators.required]],
        entity_id: [null, [Validators.required]],
        workflow_id: [null, [Validators.required]],
        confirm_password: [null, Validators.required],
        active: false,
      },
      { validator: this.checkPasswords }
    );
  }

  // compare password with confirm password.
  checkPasswords(form: AbstractControl): { invalid: boolean } {
    if (form.get("password").value !== form.get("confirm_password").value) {
      return { invalid: true };
    }
  }

  onFormSubmit() {
    this.checkPasswordForm(this.userCreateForm.controls.password);
    //if (this.userCreateForm.valid) {
      this.spinner.show();
      console.log(this.userCreateForm.value);
      const { name, username, groups, departmentId, entity_id, is_client, is_workflow, is_admin, workflow_id, phone_no, address, email, password, confirm_password, active } = this.userCreateForm.value;
      this.userService.createUser({name, username, groups, departmentId, entity_id, is_client, is_workflow, is_admin, workflow_id, phone_no, address, email, password, confirm_password, active}).subscribe((response) => {
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          console.log(response);
          this.spinner.hide();
          this.activeModal.close();
          this.userCreateEventEmitter.emit(response);
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
    //}
    if (this.userCreateForm.invalid) {
      // To display errors below forms
      Object.keys(this.userCreateForm.controls).forEach(field => {
        const control = this.userCreateForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      }
  }

  closeModal() {
    this.activeModal.close();
  }


  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  checkPasswordForm(passwordField: AbstractControl) {
    const { errors } = passwordField;
    if (errors != null) {

    if (Object.keys(errors).length !== 0) {
      for (const property in errors) {
        console.log(`obj.${property} = ${errors[property]}`);
        switch(property) {
          case "hasSpecialCharacter":
            this.translatedToastr.error("ERROR", "PASSWORD_MUST_HAVE_A_SPECIAL_CHARACTER_(#?!@$%^&*-)");
            break;
          case "hasANumber":
            this.translatedToastr.error("ERROR", "PASSWORD_MUST_HAVE_A_NUMBER_(0-9)");
            break;
          case "hasCapitalCase":
            this.translatedToastr.error("ERROR", "PASSWORD_MUST_HAVE_A_CAPITAL_LETTER_(A-Z)");
            break;
          default:
        }
      }
    }
  }
  }


  getDepartments() {
    this.departmentService.getDepartments().subscribe(data => {
			console.log('Departments list: ', data);
      this.departments$ = data;
		}, (err) => {
			console.log('data error: ', err);
		});
  }

  getOrganizations() {
    this.organizationService.getOrganizations().subscribe(data => {
			console.log('Organizations list: ', data);
      this.organizations$ = data;
		}, (err) => {
			console.log('data error: ', err);
		});
  }

  getWorkflows() {
    this.workflowService.getRecordList().subscribe(data => {
			console.log('Organizations list: ', data);
      this.workflows$ = data;
		}, (err) => {
			console.log('data error: ', err);
		});
  }

  isUserClient(event){
    if(event){
      this.isClient$ = true;
      this.isWorkflow$ = false;
      this.userCreateForm.get('is_client').setValue(true);
    }
    else{
      this.isClient$ = false;
      this.userCreateForm.get('is_client').setValue(false);
    }
  }

  isUserAdmin(event){
    if(event){
      this.isAdmin$ = true;
      this.userCreateForm.get('is_admin').setValue(true);
    }
    else{
      this.isAdmin$ = true;
      this.userCreateForm.get('is_admin').setValue(false);
    }
  }

  isUserWorkflow(event){
    if(event){
      // this.clinetTemp = this.isClient$;
      this.isClient$ = false;
      this.isWorkflow$ = true;
      this.userCreateForm.get('is_workflow').setValue(true);
    }
    else{
      // this.isClient$ = this.clinetTemp;
      this.isWorkflow$ = false;
      this.userCreateForm.get('is_workflow').setValue(false);
    }
  }


}
