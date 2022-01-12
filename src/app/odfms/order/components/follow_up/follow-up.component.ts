import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { WizardComponent } from 'angular-archwizard';
import { OrderService } from '../../order.service';
import { MinistryService } from 'app/services/ministry.service';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CreateFollowUpComponent } from './component/create-follow_up/create-follow-up.component';
import { FollowUpService } from 'app/services/follow-up.service';
import { EditFollowUpComponent } from './component/edit-follow_up/edit-follow-up.component';

@Component({
    selector: 'app-follow-up',
    templateUrl: './follow-up.component.html',
    styleUrls: ['./follow-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowUPComponent implements OnInit, AfterViewInit {
    @Input() data;
    dataCount = new Array();
    followData;

    constructor(
        private ref: ChangeDetectorRef,
        public spinner: NgxSpinnerService,
        private formBuilder: FormBuilder,
        private orderService: OrderService,
        private router: Router,
        private followUpService: FollowUpService,
        public translate: TranslateService,
        private modalService: NgbModal,
        private ministryService: MinistryService,
        private authorityService: AuthorityService,
        private commissionService: CommissionService,
        public toastr: ToastrService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        console.log("order id in FollowUp: ", this.data);
        this.loadMainData();
        this.loadCountFollow();
    }

    loadMainData() {
        this.followUpService.getFollowUpByOrder(this.data).subscribe(res => {
            console.log("follow up data: ", res);
            this.followData = res;
            this.cdr.detectChanges();
            
        }, err => {
            this.followData = err;
            console.log("follow up error: ", err);
        });
    }

    loadCountFollow() {
        this.dataCount = [];
        this.followUpService.getFollowUpCountByType(this.data).subscribe(res => {
            console.log("followUp Count: ", res);


            for (let i = 0; i < res.length; i++) {
                let item = {}
                item["count"] = res[i][0];
                item["name"] = res[i][1];
                this.dataCount.push(item);
            }
            this.cdr.detectChanges();

            console.log("dataCount: ", this.dataCount);
        }, err => {
            console.log("error in data: ", err);
        });
    }




    ngAfterViewInit() {
        setTimeout(() => {
            this.ref.detectChanges();
        }, 100);

    }

    showErrorToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toastr.error(msg, header, {
            positionClass: 'toast-top-left',
        });
    }

    showSuccessToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toastr.success(msg, header, {
            positionClass: 'toast-top-left',
        });
    }


    open(decreeData, component, cType = 'other', size = 'lg') {
        const modalRef = this.modalService.open(component, {
            centered: true,
            size: <any>size,
            backdrop: cType == 'view' ? true : 'static',
            keyboard: cType == 'view' ? true : false
        });
        if (decreeData) {
            modalRef.componentInstance.data = decreeData;
        }
        modalRef.result.then(data => {
            console.log("🚀 ~ file: decree.component.ts ~ line 225 ~ DecreeComponent ~ open ~ data", data)
            switch (data.type) {
                case 'edit':
                    this.showSuccessToast(data.title, 'Successfully edited');
                    this.loadCountFollow();
                    this.loadMainData();
                    break;
                case 'create':
                    this.showSuccessToast(data.title, 'Successfully created');
                    this.loadCountFollow();
                    this.loadMainData();
                    break;
            }
        }).catch(err => {
            console.log('Modal dismissed');
        });
    }

    editFollowUP(id) {
        this.followUpService.getFollowUp(id).subscribe(res => {
            let data = res['objection'];
            this.open(data, EditFollowUpComponent, 'edit', 'md');
        }, err => {
            console.log("error in data: ", err);
            this.showErrorToast("ERROR","ERROR");
        });
    }


    createFollowUp() {
        this.open(this.data, CreateFollowUpComponent, 'create', 'md');
    }
}
