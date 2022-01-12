import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../order.service';
import { EditOrderComponent } from '../edit-order/edit-order.component';

@Component({
    selector: 'app-view-order',
    templateUrl: './view-order.component.html',
    styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
    data;
    showOrder = false;
    orderId;
    
    constructor(
        
        public translate: TranslateService,
        public spinner: NgxSpinnerService,
        private cdr: ChangeDetectorRef,
        private toastr: ToastrService,
        private modalService: NgbModal,
        private router: Router,
        private orderService: OrderService,
        private route: ActivatedRoute
    ) {
        this.orderId = this.route.snapshot.paramMap.get('id');
     }

    ngOnInit(): void {
        console.log("orderId: ", this.orderId);
        this.loadOrderData();
    }

    loadOrderData(){
        this.spinner.show();
        this.orderService.getRecordById(this.orderId).subscribe(res=>{
            console.log("orderData: ", res);
            this.data = res;
            this.spinner.hide();
            this.showOrder = true;
        }, err=>{
            console.log("error orderData: ", err);
            this.spinner.hide();
        });
    }

    editOrder(id){
        console.log("order Id: ", id);
        this.open(this.data,EditOrderComponent, 'edit','md')
    }

    goToOrders(){
      this.router.navigate([`order/`]);
    }


    ShowSuccessToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toastr.success(msg, header, {
          positionClass: 'toast-top-left',
        });
      }
    
      ShowErrorToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toastr.error(msg, header, {
          positionClass: 'toast-top-left',
        });
      }
    
    
      open(surveyData, component, cType = 'other', size = 'lg') {
        const modalRef = this.modalService.open(component, {
          centered: true,
          size: <any>size,
          backdrop: cType == 'view' ? true : 'static',
          keyboard: cType == 'view' ? true : false
        });
        if (surveyData) {
          modalRef.componentInstance.data = surveyData;
        }
    
        modalRef.result.then(data => {
          switch (data.type) {
            case 'edit':
              this.ShowSuccessToast(data.title, 'Successfully edited');
              this.loadPage();
              break;
            case 'create':
              this.ShowSuccessToast(data.title, 'Successfully created');
              break;
            case 'photo':
              this.ShowSuccessToast(data.title, 'Successfully Uploaded');
              break;
            case 'document':
              this.ShowSuccessToast(data.title, 'Successfully Uploaded');
              break;
            case 'approve':
              this.ShowSuccessToast(data.title, 'Successfully_done');
              break;
          }
        }).catch(err => {
          console.log('Modal dismissed');
        });
      }

      loadPage(){
        this.loadOrderData();
      }

    


}
