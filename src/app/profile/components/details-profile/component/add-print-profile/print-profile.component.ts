import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from 'app/profile/profile.service';
import {MedicalService} from 'app/services/medical.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-print-profile',
  templateUrl: './print-profile.component.html',
  styleUrls: ['./print-profile.component.scss']
})
export class PrintProfileComponent implements OnInit {

  data;
  modelType:boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    public profileService: ProfileService,
    private medicalService: MedicalService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'MEDICAL_REPORT'};
    }
    
    this.activeModal.close(data);
  }


  printAbstract(){
        this.profileService.printAbstractProfile(this.data);
  }

  printSummary(){
    console.log("printSummary");
    this.profileService.printCVProfile(this.data);
}

}
