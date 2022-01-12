import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from 'app/profile/profile.service';
import {CrimeService} from 'app/services/crime.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { SalaryService } from 'app/services/salary.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-crime-profile',
  templateUrl: './edit-crime.component.html',
  styleUrls: ['./edit-crime.component.scss']
})
export class EditCrimeComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  profileJob$;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private crimeService: CrimeService,
    private dConvert: DateConvertService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      date:[null,[Validators.required]],
      crimeType:[null,[Validators.required]],
      profileJob:[null],
    });

    this.changeDate(this.data);
    this.loadProfileJobs();

  }

  changeDate(data){
    this.data.date = (data.date === null? null: this.dConvert.convertToDariDate(data.date));

    this.setForm(this.data);
  }

  loadProfileJobs(){
    this.profileJob$ = this.profileService.getJobsByProfile(this.data.profile.id);
  }

  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      date:editRecord.date? editRecord.date:null,
      crimeType: editRecord.crimeType? editRecord.crimeType:null,
      profileJob: editRecord.profileJob? editRecord.profileJob.id:null,
		});
	}

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'OFF_DUTY_CRIMES'};
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
      this.addForm.get('profile').setValue(Number(this.data.profile.id));
      console.log("all Data: ", this.addForm.value);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.addForm.value));
      this.loading = true;
      this.crimeService.editCrime(this.data.id,formData).subscribe(res=>{
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

}
