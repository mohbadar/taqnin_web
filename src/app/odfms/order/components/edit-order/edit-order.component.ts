import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'app/odfms/order/order.service';
import { CommissionService } from 'app/services/commission.service';
import { MinistryService } from 'app/services/ministry.service';
import { AuthorityService } from 'app/services/authority.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Globals } from 'app/_helpers/globals';
import { DepartmentService } from 'app/services/department.service';
import { DateConvertService } from 'app/services/date-convert.service';


@Component({
    selector: 'app-edit-order',
    templateUrl: './edit-order.component.html',
    styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
    data;
    proposalForm;
    addFormSubmitted = false;
    loading = false;
    entity = new Array();
    subEntity = new Array();
    modelType:boolean = false;
    department$;



    constructor(
        public activeModal: NgbActiveModal,
        private ref: ChangeDetectorRef,
        public spinner: NgxSpinnerService,
        private formBuilder: FormBuilder,
        private orderService: OrderService,
        public translate: TranslateService,
        private modal: NgbModal,
        private dConvert: DateConvertService,
        private departmentService: DepartmentService,
        public toastr: ToastrService,
        private cdr: ChangeDetectorRef,
        public globals: Globals,
    ) { }

    ngOnInit(): void {
         this.buildForm();
         console.log("Order data in edit: ", this.data);
         this.loadDepartment();
         this.papulateEntityData();
         this.papultateSubEntityData();
         this.changeDate(this.data);
    }


    buildForm() {
        this.proposalForm = this.formBuilder.group({
            orderNumber: [null, Validators.required],
            orderDate: [null, Validators.required],
            summary: [null, Validators.required],
            implementationEndDate: [null, Validators.required],
            implementingDepartments: [null, Validators.required],
            assistingDepartments: [null, Validators.required]
        });
    }

    changeDate(data){
        this.data.orderDate = (data.orderDate === null? null: this.dConvert.convertToDariDate(data.orderDate));
        this.data.implementationEndDate = (data.implementationEndDate === null? null: this.dConvert.convertToDariDate(data.implementationEndDate));
        this.setForm(this.data);
    }
    setForm(editRecord: any) {
		this.proposalForm.patchValue(editRecord);
		this.proposalForm.patchValue({
            orderNumber:editRecord.orderNumber? editRecord.orderNumber:null,
            orderDate: editRecord.orderDate? editRecord.orderDate:null,
            summary: editRecord.summary? editRecord.summary:null,
            implementationEndDate: editRecord.implementationEndDate? editRecord.implementationEndDate:null,
            implementingDepartments: this.entity? this.entity:null,
            assistingDepartments: this.subEntity? this.subEntity:null,
	});
	}


    papulateEntityData(){
        for(let i of this.data.implementingDepartments){
          this.entity.push(i.id);
        }
      }
    
      papultateSubEntityData(){
        for(let i of this.data.assistingDepartments){
          this.subEntity.push(i.id);
        }
      }

    setToNull(formName, name) {
        console.log(name);
        formName.controls[name].setValue(null);
    }
    
    get cpf() {
        return this.proposalForm.controls;
    }

    loadDepartment() {
        this.department$ = this.departmentService.getDepartments();
      }


    closeModal() {
        let data;
        if(this.modelType){
           data = {type:'edit', title:'ORDER'};
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
        //   const formData = new FormData();
        //   formData.append('data', JSON.stringify(this.proposalForm.value));
        const { orderNumber, orderDate, summary, 
            implementationEndDate, implementingDepartments, assistingDepartments } = this.proposalForm.value;
          this.loading = true;
          this.orderService.editOrder(this.data.id,
            {
                orderNumber, orderDate, summary, implementationEndDate,
                implementingDepartmentsIds: implementingDepartments, assistingDepartmentsIds: assistingDepartments, subjectId: this.data.subject.id
              }).subscribe(res=>{
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
