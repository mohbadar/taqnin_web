import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ProposalService } from '../../proposal.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'app/services/department.service';
import { UtilityService } from 'app/services/utility.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { ShuraService } from 'app/configuration/shura/shura.service';

@Component({
  selector: 'app-edit-proposal',
  templateUrl: './edit-proposal.component.html',
  styleUrls: ['./edit-proposal.component.scss']
})
export class EditProposalComponent implements OnInit {
  data;
  proposalForm;
  addFormSubmitted = false;
  secretTypes;
  department$;
  authoritAgreement$;
  loading = false;
  decisionEntity = false;
  modelType:boolean = false;
  subEntityImplementation = false;
  entity = new Array();
  subEntity = new Array();
  previousLink = false;
  subAuthorityShare = false;
  governmentBudget = null;
  forignBuget = null;
  internationalAgree = null;
  nextFollowUp = false;
  showSubEntityAgreement = false;
  shura$;

  constructor(
    private proposalService: ProposalService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private router: Router,
    private shuraService: ShuraService,
    private dConvert: DateConvertService,
    private deparmentService: DepartmentService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    console.log("proposal Data: ", this.data);
    this.fixRadionButton();
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
      previousLink: [null],
      previousDecision: [null],
      lawArticle: [null, [Validators.required]],
      subAuthorityShare: [null],
      authorityImplementation: [null],
      governmentBudget: [null],
      forignBuget: [null],
      internationalAgree: [null],
      authorityAgreement: [null],
      ministriesImplementation: [null],
      implementationScope: [null],
      proposalPreResult: [null, [Validators.required]],
      papers: [null, [Validators.required]],
      progressBasedOnLaw: [null, [Validators.required]],
      nextFollowUp: [null],
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
    this.papulateEntityData();
    this.papultateSubEntityData();
    this.loadShura();
    this.changeDate(this.data);
  }

  
  changeDate(data){
    this.data.proposalDate = (data.proposalDate === null? null: this.dConvert.convertToDariDate(data.proposalDate));
    this.proposalForm.get("forignBuget").setValue(data.forignBuget);
    this.proposalForm.get('governmentBudget').setValue(data.governmentBudget);
    this.proposalForm.get("internationalAgree").setValue(data.internationalAgree);
    this.proposalForm.get('nextFollowUp').setValue(data.nextFollowUp);
    this.proposalForm.get('previousLink').setValue(data.previousLink);
    this.proposalForm.get('subAuthorityShare').setValue(data.subAuthorityShare);
    this.setForm(this.data);
  }

  setForm(editRecord: any) {
		this.proposalForm.patchValue(editRecord);
		this.proposalForm.patchValue({
      secretLevel:editRecord.secretLevel? editRecord.secretLevel:null,
      proposalNumber: editRecord.proposalNumber? editRecord.proposalNumber:null,
      proposalDate: editRecord.proposalDate? editRecord.proposalDate:null,
      summary: editRecord.summary? editRecord.summary:null,
      objective: editRecord.objective? editRecord.objective:null,
      previousDecision: editRecord.previousDecision? editRecord.previousDecision:null,
      lawArticle: editRecord.lawArticle? editRecord.lawArticle:null,
      authorityImplementation: editRecord.authorityImplementation? editRecord.authorityImplementation:null,
      authorityAgreement: editRecord.authorityAgreement? editRecord.authorityAgreement.id:null,
      ministriesImplementation: editRecord.ministriesImplementation? editRecord.ministriesImplementation:null,
      implementationScope: editRecord.implementationScope? editRecord.implementationScope:null,
      proposalPreResult: editRecord.proposalPreResult? editRecord.proposalPreResult:null,
      papers: editRecord.papers? editRecord.papers:null,
      progressBasedOnLaw: editRecord.progressBasedOnLaw? editRecord.progressBasedOnLaw:null,
      reason: editRecord.reason? editRecord.reason:null,
      proposalContent: editRecord.proposalContent? editRecord.proposalContent:null,
      entity: this.entity? this.entity:null,
      subEntity: this.subEntity? this.subEntity:null,
      shura:editRecord.shura? editRecord.shura.id:null,
		});
	}


  loadShura(){
    this.shura$ = this.shuraService.getShuras();
  }

  papulateEntityData(){
    for(let i of this.data.entity){
      this.entity.push(i.id);
    }
  }

  papultateSubEntityData(){
    for(let i of this.data.subEntity){
      this.subEntity.push(i.id);
    }
  }

  fixRadionButton(){
    if(this.data.previousLink == true){
      this.previousLink = true;
    }

    if(this.data.subAuthorityShare == true){
      this.subAuthorityShare = true;
    }

    if(this.data.authorityImplementation != null){
      this.subEntityImplementation = true;
    }

    if(this.data.previousDecision != null){
      this.decisionEntity = true;
    }

    if(this.data.governmentBudget == true){
      this.governmentBudget = true;
    }
    else if (this.data.governmentBudget == false){
      this.governmentBudget = false
    }

    if(this.data.forignBuget == true){
      this.forignBuget = true;
    }
    else if (this.data.forignBuget == false){
      this.forignBuget = false
    }
    if(this.data.internationalAgree == true){
      this.internationalAgree = true;
    }
    else if (this.data.internationalAgree == false){
      this.internationalAgree = false
    }

    if(this.data.nextFollowUp == true){
      this.nextFollowUp = true;
    }

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

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'PROPOSAL'};
    }
    
    this.activeModal.close(data);
  }

 dismiss() {
    this.activeModal.dismiss();
  }

  

  submit() {
    this.addFormSubmitted = true;
    if (this.proposalForm.invalid) {
      console.log("invalid form");
      return;
    }
    else {
      console.log("submitted successfully:", this.proposalForm.value);
      console.log("all Data: ", this.proposalForm.value);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.proposalForm.value));
      this.loading = true;
      this.proposalService.editProposal(this.data.id,formData).subscribe(res=>{
          console.log("come from server: ", res);
          this.modelType = true;
          this.loading = false;
          this.closeModal();
      }, err=>{
          console.log("error from server: ", err);
          this.loading = false;
      });
      

    }
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
