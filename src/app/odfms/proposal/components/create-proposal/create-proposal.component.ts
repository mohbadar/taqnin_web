import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ProposalService } from 'app/odfms/proposal/proposal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Globals } from 'app/_helpers/globals';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from 'app/services/utility.service';
import { DepartmentService } from 'app/services/department.service';
import { ShuraService } from 'app/configuration/shura/shura.service';


@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.scss'],
})
export class CreateProposalComponent implements OnInit {

  proposalForm;
  addFormSubmitted = false;
  secretTypes;
  department$;
  authoritAgreement$;
  decisionEntity = true;
  subEntityImplementation = true;
  showSubEntityAgreement = true;
  shura$;



  constructor(
    private ref: ChangeDetectorRef,
    private proposalService: ProposalService,
    public globals: Globals,
    private router: Router,
    private shuraService: ShuraService,
    public spinner: NgxSpinnerService,
    private deparmentService: DepartmentService,
    private utilityService: UtilityService,
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadData();
  }

  buildForm() {
    this.proposalForm = this.formBuilder.group({
      secretLevel: [null, [Validators.required]],
      proposalNumber: [null, [Validators.required]],
      proposalDate: [null, [Validators.required]],
      summary: [null, [Validators.required]],
      objective: [null, [Validators.required]],
      previousLink: [true],
      previousDecision: [null],
      lawArticle: [null, [Validators.required]],
      subAuthorityShare: [true],
      authorityImplementation: [null, [Validators.required]],
      governmentBudget: [true],
      forignBuget: [true],
      internationalAgree: [true],
      authorityAgreement: [null, [Validators.required]],
      ministriesImplementation: [null, [Validators.required]],
      implementationScope: [null, [Validators.required]],
      proposalPreResult: [null, [Validators.required]],
      papers: [null, [Validators.required]],
      progressBasedOnLaw: [null, [Validators.required]],
      nextFollowUp: [true],
      reason: [null, [Validators.required]],
      proposalContent: [null, [Validators.required]],
      entity: [null, [Validators.required]],
      subEntity: [null, [Validators.required]],
      shura:[null,[Validators.required]]
    });
  }


  loadData() {
    this.loadSecretType();
    this.loadDepartment();
    this.loadAuthorityAgreement();
    this.loadShura();
  }

  loadShura(){
    this.shura$ = this.shuraService.getShuras();
  }

  loadDepartment() {
    this.department$ = this.deparmentService.getDepartments();
  }

  loadSecretType() {
    this.secretTypes = this.utilityService.getSecretType();
  }

  loadAuthorityAgreement() {
    this.authoritAgreement$ = this.proposalService.getProposalAuthorityAgreement();
  }

  setToNull(formName, name) {
    console.log(name);
    formName.controls[name].setValue(null);
  }

  get cpf() {
    return this.proposalForm.controls;
  }

  onFormSubmit() {
    this.addFormSubmitted = true;
    if (this.proposalForm.invalid) {
      console.log("invalid form");
      return;
    }
    else {
      console.log("submitted successfully:", this.proposalForm.value);
      this.spinner.show();
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.proposalForm.value));
      console.log("data before submission: ", JSON.stringify(this.proposalForm.value));
      this.proposalService.addRecord(formData).subscribe(res => {
        console.log("successfully recored: ", res);
        this.ShowSuccessToast();
        this.routeHome();
        this.spinner.hide();
      }, err => {
        console.log("error in recording: ", err);
        this.ShowErrorToast();
        this.spinner.hide();
      });

    }
  }

  routeHome() {
    this.router.navigate(['proposal']);
  }

  ShowSuccessToast() {
    const header = this.translate.instant('CREATE_DOCUMENT');
    const msg = this.translate.instant('Successfully created');
    this.toastr.success(msg, header, {
      positionClass: 'toast-top-left',
    });
  }


  ShowErrorToast() {
    const header = this.translate.instant('CREATE_DOCUMENT');
    const msg = this.translate.instant('Successfully created');
    this.toastr.error(msg, header, {
      positionClass: 'toast-top-left',
    });
  }


  RadioClicked(event) {
    if (event.target.defaultValue === 'yes') {
      console.log("selected yes: ", event.target.defaultValue);
      this.proposalForm.get('previousLink').setValue(true);
      this.decisionEntity = true;
      this.proposalForm.get('previousDecision').setValidators([Validators.required]);

    }
    else if (event.target.defaultValue === 'no') {
      console.log("selected no: ", event.target.defaultValue);
      this.proposalForm.get('previousLink').setValue(false);
      this.decisionEntity = false;
      this.proposalForm.get('previousDecision').setErrors(null);
      this.proposalForm.get('previousDecision').clearValidators();
      this.proposalForm.get('previousDecision').setValue(null);

    }

  }

  RadioClickedEntity(event) {
    if (event.target.defaultValue === 'yes') {
      console.log("selected yes: ", event.target.defaultValue);
      this.proposalForm.get('subAuthorityShare').setValue(true);
      this.subEntityImplementation = true;
      this.proposalForm.get('authorityImplementation').setValidators([Validators.required]);

    }
    else if (event.target.defaultValue === 'no') {
      console.log("selected no: ", event.target.defaultValue);
      this.proposalForm.get('subAuthorityShare').setValue(false);
      this.subEntityImplementation = false;
      this.proposalForm.get('authorityImplementation').setErrors(null);
      this.proposalForm.get('authorityImplementation').clearValidators();
      this.proposalForm.get('authorityImplementation').setValue(null);

    }
  }



  RadioClickedBudget(event) {
    if (event.target.defaultValue === 'yes') {
      console.log("selected yes: ", event.target.defaultValue);
      this.proposalForm.get('governmentBudget').setValue(true);

    }
    else if (event.target.defaultValue === 'no') {
      console.log("selected no: ", event.target.defaultValue);
      this.proposalForm.get('governmentBudget').setValue(false);

    }

    else if (event.target.defaultValue === 'noo') {
      console.log("selected no: ", event.target.defaultValue);
      this.proposalForm.get('governmentBudget').setValue(null);

    }
  }


  RadioClickedInterBudget(event) {
    if (event.target.defaultValue === 'yes') {
      console.log("selected yes: ", event.target.defaultValue);
      this.proposalForm.get('forignBuget').setValue(true);

    }
    else if (event.target.defaultValue === 'no') {
      console.log("selected no: ", event.target.defaultValue);
      this.proposalForm.get('forignBuget').setValue(false);

    }

    else if (event.target.defaultValue === 'noo') {
      console.log("selected no: ", event.target.defaultValue);
      this.proposalForm.get('forignBuget').setValue(null);

    }
  }

  RadioClickedInterAgree(event) {
    if (event.target.defaultValue === 'yes') {
      console.log("selected yes: ", event.target.defaultValue);
      this.proposalForm.get('internationalAgree').setValue(true);
      this.showSubEntityAgreement = true;
      this.proposalForm.get('ministriesImplementation').setValidators([Validators.required]);
      this.proposalForm.get('authorityAgreement').setValidators([Validators.required]);
      this.proposalForm.get('implementationScope').setValidators([Validators.required]);

      

    }
    else if (event.target.defaultValue === 'no') {
      console.log("selected no: ", event.target.defaultValue);
      this.proposalForm.get('internationalAgree').setValue(false);
      this.showSubEntityAgreement = false;
      this.proposalForm.get('ministriesImplementation').setErrors(null);
      this.proposalForm.get('ministriesImplementation').clearValidators();
      this.proposalForm.get('ministriesImplementation').setValue(null);

      this.proposalForm.get('authorityAgreement').setErrors(null);
      this.proposalForm.get('authorityAgreement').clearValidators();
      this.proposalForm.get('authorityAgreement').setValue(null);

      this.proposalForm.get('implementationScope').setErrors(null);
      this.proposalForm.get('implementationScope').clearValidators();
      this.proposalForm.get('implementationScope').setValue(null);
      

    }

    else if (event.target.defaultValue === 'noo') {
      console.log("selected no: ", event.target.defaultValue);
      this.proposalForm.get('internationalAgree').setValue(null);
      this.showSubEntityAgreement = false
      this.proposalForm.get('ministriesImplementation').setErrors(null);
      this.proposalForm.get('ministriesImplementation').clearValidators();
      this.proposalForm.get('ministriesImplementation').setValue(null);

      this.proposalForm.get('authorityAgreement').setErrors(null);
      this.proposalForm.get('authorityAgreement').clearValidators();
      this.proposalForm.get('authorityAgreement').setValue(null);

      this.proposalForm.get('implementationScope').setErrors(null);
      this.proposalForm.get('implementationScope').clearValidators();
      this.proposalForm.get('implementationScope').setValue(null);

    }
  }



  RadioClickedFollowUp(event) {
    if (event.target.defaultValue === 'yes') {
      console.log("selected yes: ", event.target.defaultValue);
      this.proposalForm.get('nextFollowUp').setValue(true);

    }
    else if (event.target.defaultValue === 'no') {
      console.log("selected no: ", event.target.defaultValue);
      this.proposalForm.get('nextFollowUp').setValue(false);

    }
  }

}
