import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from 'app/profile/profile.service';
import { PromotionProfileService } from 'app/services/promotion-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-promotion-p-profile',
  templateUrl: './add-promotion-profile.component.html',
  styleUrls: ['./add-promotion-profile.component.scss']
})
export class AddPromotionProfileComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  grade$;
  militaryGrade$;
  profileJob$;
  allPromotion;
  promotionType$;
  showOldCivilanGrade = true;
  showOldMilitaryGrade = false;
  showNewCivilanGrade = true;
  showNewMilitaryGrade = false;

  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private promotionService: PromotionProfileService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      maktubNumber:[null,[Validators.required]],
      maktubDate:[null,[Validators.required]],
      oldGrade:[null, [Validators.required]],
      newGrade:[null, [Validators.required]],
      oldMilitaryGrade:[null],
      newMilitaryGrade:[null],
      profileJob:[null,[Validators.required]],
      type:[null, [Validators.required]],
      qadamYear:[null, [Validators.max(100), Validators.min(1)]],
      qadamMonth:[null, [Validators.max(12), Validators.min(1)]],
      qadamDay:[null, [Validators.max(31), Validators.min(1)]],
    });

    this.loadGrades();
    this.loadProfileJobs();
    this.loadLatestQadam();
    this.loadPromotionType();
    this.loadMilitaryGrade();

  }

  loadMilitaryGrade(){
    this.militaryGrade$ = this.profileService.getEmployeeMilitaryGrade();
  }

  loadPromotionType(){
    this.promotionType$ = this.promotionService.getPromotionType();
  }

  loadProfileJobs(){
    this.profileJob$ = this.profileService.getJobsByProfile(this.data);
  }

  loadLatestQadam(){
    this.loading = true;
    this.promotionService.getLastestPromotionByProfile(this.data).subscribe(res=>{
      this.allPromotion = res;
      this.addForm.get("qadamYear").setValue(res?res.qadamYear:null);
      this.addForm.get("qadamMonth").setValue(res?res.qadamMonth:null);
      this.addForm.get("qadamDay").setValue(res?res.qadamDay:null);
      this.addForm.get("oldGrade").setValue(res?res.newGrade.id:null);
      console.log("Qadam: ", res);
      this.loading = false;
    }, err=>{
      console.log("error in finding qadam: ", err);
      this.loading = false;
    });
  }



  


  loadGrades() {
    this.grade$ = this.profileService.getEmployeeGrade();
  }


  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'PROMOTION'};
    }
    
    this.activeModal.close(data);
  }

  get cpf() {
    return this.addForm.controls;
  }

  setToNull(formName, name) {
    console.log(name);
    formName.controls[name].setValue(null);
  }

  submit(){
    this.addFormSubmitted = true;
    if (this.addForm.invalid) {
      return;
    }
    else{
      this.addForm.addControl('profile',new FormControl(null));
      this.addForm.get('profile').setValue(Number(this.data));
      console.log("all Data: ", this.addForm.value);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.addForm.value));
      this.loading = true;
      this.promotionService.addPromotion(formData).subscribe(res=>{
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
    if (event.target.defaultValue === 'civilian') {
      console.log("selected civilan: ", event.target.defaultValue);
      this.showOldCivilanGrade = true;
      this.showOldMilitaryGrade = false;
      this.addForm.get('oldGrade').setValidators([Validators.required]);
      this.addForm.get('oldMilitaryGrade').setErrors(null);
      this.addForm.get('oldMilitaryGrade').clearValidators();
      this.addForm.get('oldMilitaryGrade').setValue(null);
     
    }

    else if(event.target.defaultValue === 'military')
    {
      console.log("selected miliary: ", event.target.defaultValue);
      this.showOldMilitaryGrade = true;
      this.showOldCivilanGrade = false;
      this.addForm.get('oldMilitaryGrade').setValidators([Validators.required]);
      this.addForm.get('oldGrade').setErrors(null);
      this.addForm.get('oldGrade').clearValidators();
      this.addForm.get('oldGrade').setValue(null);

    }

  }


  RadioClickedNew(event) {
    if (event.target.defaultValue === 'civilian') {
      console.log("selected civilan: ", event.target.defaultValue);
      this.showNewCivilanGrade = true;
      this.showNewMilitaryGrade = false;
      this.addForm.get('newGrade').setValidators([Validators.required]);
      this.addForm.get('newMilitaryGrade').setErrors(null);
      this.addForm.get('newMilitaryGrade').clearValidators();
      this.addForm.get('newMilitaryGrade').setValue(null);
     
    }

    else if(event.target.defaultValue === 'military')
    {
      console.log("selected miliary: ", event.target.defaultValue);
      this.showNewMilitaryGrade = true;
      this.showNewCivilanGrade = false;
      this.addForm.get('newMilitaryGrade').setValidators([Validators.required]);
      this.addForm.get('newGrade').setErrors(null);
      this.addForm.get('newGrade').clearValidators();
      this.addForm.get('newGrade').setValue(null);

    }

  }



}
