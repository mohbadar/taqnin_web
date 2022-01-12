import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../user.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../../user';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from 'app/_helpers/globals';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DepartmentService } from 'app/services/department.service';
import { StepService } from 'app/taqnin/step/step.service';
import { OrganizationService } from 'app/services/organization.service';
import { WorkflowService } from 'app/taqnin/workflow/workflow.service';
// declare var $: any;


@Component({
	selector: 'user-edit-dialog',
	templateUrl: './user-edit-dialog.component.html',
	styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {
	@Output() userEditEventEmitter = new EventEmitter<Object>();

	isLoading = false;
	newUser: User;
	userEditForm: FormGroup;
	@Input() data;

	isSysAdmin;
	envs;
	ministries$;
  organizations$;
	departments$;
  workflows$
	showDepartmentField = false;
  isClient$ = false;
  isWorkflow$ = false;
  isAdmin$ = false;

	constructor(
		public userService: UserService,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		private globals: Globals,
		public activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private departmentService: DepartmentService,
    private organizationService: OrganizationService,
		private changeDetectorRef: ChangeDetectorRef,
    private workflowService: WorkflowService
	) { }

	ngOnInit() {
		console.log('user data is:', this.data);
    this.isClient$ = this.data.user.isClient;
    this.isWorkflow$ = this.data.user.isWorkflow;
    this.isAdmin$ = this.data.user.isAdmin;
		this.getDepartments();
    this.getOrganizations();
    this.getWorkflows();

    this.userEditForm = this.formBuilder.group({
			name: [this.data.user.name, [Validators.required]],
			username: [this.data.user.username, [Validators.required, Validators.minLength(3)]],
			groups: [this.data.groups.map(item => item.id)],
			departmentId: [this.data.user.department?.id],
			phone_no: [this.data.user.phoneNo, [Validators.required]],
			address: [this.data.user.address, [Validators.required]],
			email: [this.data.user.email, [Validators.required, Validators.email]],
			active: [this.data.user.active.toString()],
      is_client: [this.data.user.is_client, [Validators.required]],
      is_workflow: [this.data.user.is_workflow, [Validators.required]],
      is_admin: [this.data.user.is_admin, [Validators.required]],
      entity_id: [this.data.user.entity?.entity_id, [Validators.required]],
      workflow_id: [this.data.user.workflow?.id, [Validators.required]],
		});

		this.isSysAdmin = this.globals.principal.hasAuthority(['SYS_ADMIN']);
		if (this.isSysAdmin) {
			this.envs = this.globals.principal.environments;
		}

    //this.setStatusValues();
	}

	onEditFormSubmit() {
		//if (this.userEditForm.valid) {
			this.spinner.show();
            const { id } = this.data.user;
            const { name, username, groups, departmentId, entity_id, is_client, is_workflow, is_admin, workflow_id, phone_no, address, email, active } = this.userEditForm.value;
			this.userService.updateUser(id, { name, username, groups, departmentId, entity_id, is_client, is_workflow, is_admin, workflow_id, phone_no, address, email, active})
			.subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
			    this.spinner.hide();
				this.activeModal.close();
				console.log(response);
			    this.userEditEventEmitter.emit(response);
			}, (error) => {
				this.spinner.hide();
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
                console.log(error);
			});
		//}

		if (this.userEditForm.invalid) {
		// To display errors below forms
		Object.keys(this.userEditForm.controls).forEach(field => {
			const control = this.userEditForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
	}

	closeModal() {
		this.activeModal.close();
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
      this.userEditForm.get('is_client').setValue(true);
    }
    else{
      this.isClient$ = false;
      this.userEditForm.get('is_client').setValue(false);
    }
  }

  isUserWorkflow(event){
    if(event){
      // this.clinetTemp = this.isClient$;
      this.isClient$ = false;
      this.isWorkflow$ = true;
      this.userEditForm.get('is_workflow').setValue(true);
    }
    else{
      // this.isClient$ = this.clinetTemp;
      this.isWorkflow$ = false;
      this.userEditForm.get('is_workflow').setValue(false);
    }
  }

  isUserAdmin(event){
    if(event){
      this.isAdmin$ = true;
      this.userEditForm.get('is_admin').setValue(true);
    }
    else{
      this.isAdmin$ = true;
      this.userEditForm.get('is_admin').setValue(false);
    }
  }

  setStatusValues(){
    if(this.isClient$){
      this.userEditForm.get('is_client').setValue(true);
    }else{
      this.userEditForm.get('is_client').setValue(false);
    }

    if(this.isWorkflow$){
      this.userEditForm.get('is_workflow').setValue(true);
    }else{
      this.userEditForm.get('is_workflow').setValue(false);
    }
  }



}
