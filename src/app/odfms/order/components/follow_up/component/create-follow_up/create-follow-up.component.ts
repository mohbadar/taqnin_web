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
import { FollowUpService } from 'app/services/follow-up.service';
import { DateConvertService } from 'app/services/date-convert.service';


@Component({
  selector: 'app-create-follow-up',
  templateUrl: './create-follow-up.component.html',
  styleUrls: ['./create-follow-up.component.scss']
})
export class CreateFollowUpComponent implements OnInit {
  data;
  proposalForm;
  addFormSubmitted = false;
  loading = false;
  modelType: boolean = false;
  type$;



  constructor(
    public activeModal: NgbActiveModal,
    private ref: ChangeDetectorRef,
    public spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public toastr: ToastrService,
    private followUpService: FollowUpService,
    private cdr: ChangeDetectorRef,
    public globals: Globals,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    console.log("Order data in edit: ", this.data);
    this.loadTypes();
  }


  buildForm() {
    this.proposalForm = this.formBuilder.group({
      date: [null, Validators.required],
      title: [null, Validators.required],
      summary: [null, Validators.required],
      type: [null, Validators.required],
    });
  }



  setToNull(formName, name) {
    console.log(name);
    formName.controls[name].setValue(null);
  }

  get cpf() {
    return this.proposalForm.controls;
  }

  loadTypes() {
    this.type$ = this.followUpService.getFollowUpTypes();
  }


  closeModal() {
    let data;
    if (this.modelType) {
      data = { type: 'create', title: 'FOLLOWUP' };
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
      this.proposalForm.addControl('order', new FormControl(null));
      this.proposalForm.get('order').setValue(Number(this.data));
      console.log("all Data: ", this.proposalForm.value);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.proposalForm.value));
      this.loading = true;
      this.followUpService.addFollowUp(formData).subscribe(res => {
        console.log("come from server: ", res);
        this.modelType = true;
        this.loading = false;
        this.closeModal();
      }, err => {
        console.log("error from server: ", err);
        this.loading = false;
      });


    }
  }




}
