import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromotionService } from 'app/promotion/promotion.service';
import { PromotionTypeService } from 'app/services/promotion-type.service';
import { DateConvertService } from 'app/services/date-convert.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent implements OnInit {
  promotionType$;
  promotionForm: FormGroup;

  data:any;
  constructor(private promotionService: PromotionService,
    private dConvert: DateConvertService,
    private router: Router,
    private promotionTypeService: PromotionTypeService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,) {
    
   }

  ngOnInit(){
    this.getAllPromotionTypes();
    this.createForm();
  }

  createForm() {
    this.promotionForm = this.formBuilder.group({
      promotionType: ['', Validators.required],
      rank: ['', Validators.required],
      step: ['', Validators.required],
      proposalNum: ['', Validators.required],
      proposalDate: ['', Validators.required],
      decreeNum: ['', Validators.required],
      decreeDate: ['', Validators.required],
      promotionDate: ['', Validators.required],
      
    });
  }

  getAllPromotionTypes() {
    this.promotionType$ = this.promotionTypeService.getPromotionTypeList();
  }
 
  submit() {
    const data = this.promotionForm.value;
    console.log("data",data)
    
    if (data.promotionDate != null)
      data.promotionDate= this.dConvert.convertToGregorianDate(data.promotionDate);
      console.log("promotionDate", data.promotionDate);
    if (data.proposalDate != null)
      data.proposalDate= this.dConvert.convertToGregorianDate(data.proposalDate);
      console.log("proposalDate", data.proposalDate);
    if (data.promotionDate != null)
      data.decreeDate= this.dConvert.convertToGregorianDate(data.decreeDate);
      console.log("decreeDate", data.decreeDate);
      console.log("data",data)
    data.promotionType={id:data.promotionType};
    this.promotionService.createPromotion(data).subscribe(res=>{
      
      console.log("successfully recored: ", res);
      this.router.navigate(['/promotions']);
    }, err=>{
      console.log("error in recording: ", err);
    });
    
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);

  }

}
