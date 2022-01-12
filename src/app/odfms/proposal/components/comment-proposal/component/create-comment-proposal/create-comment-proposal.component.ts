import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from 'app/services/department.service';
import { UtilityService } from 'app/services/utility.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { ProposalService } from 'app/odfms/proposal/proposal.service';

@Component({
  selector: 'app-create-comment-proposal',
  templateUrl: './create-comment-proposal.component.html',
  styleUrls: ['./create-comment-proposal.component.scss']
})
export class CreateCommentProposalComponent implements OnInit {
  data;
  proposalForm;
  modelType = false;
  addFormSubmitted = false;
  attachmentFile: any;
 

  constructor(
    private translate: TranslateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private router: Router,
    private dConvert: DateConvertService,
    private deparmentService: DepartmentService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private proposalService: ProposalService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    console.log("proposal id create comment: ", this.data);
    this.buildForm();
  }


  buildForm() {
    this.proposalForm = this.formBuilder.group({
      title:[null,[Validators.required]],
      content:[null,[Validators.required]]
    });
  }




  fileChangeListener(event): void {
    if(event != null)
    {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        this.attachmentFile = event.target.files[0];
        document.getElementById('fileName').innerHTML = event.target.files[0].name;
      }
    }
    else{
      document.getElementById('fileName').innerHTML = null;
    }

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
       data = {type:'create', title:'COMMENT'};
    }
    
    this.activeModal.close(data);
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  

  submitData() {
    this.addFormSubmitted = true;
    if (this.proposalForm.invalid) {
      console.log("invalid form");
      return;
    }
    else {
      this.proposalForm.addControl('proposal',new FormControl(null));
      this.proposalForm.get('proposal').setValue(Number(this.data));
      const formData = new FormData();
      formData.append('avatar', this.attachmentFile);
      formData.append('data', JSON.stringify(this.proposalForm.value));
      console.log("submitted successfully:", this.proposalForm.value);
      console.log("avator:", this.attachmentFile);
      this.proposalService.addComment(formData).subscribe(res=>{
        this.modelType = true;
        console.log("come from server: ", res);
        this.closeModal();
      }, err=>{
         console.log("error from server: ", err);
         this.ShowErrorToast('COMMENT','ERROR');
      });

    }
  }



  ShowErrorToast(title, message) {
    const header = this.translate.instant(title);
    const msg = this.translate.instant(message);
    this.toastr.error(msg, header, {
      positionClass: 'toast-top-left',
    });
  }



}
