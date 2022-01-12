import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-agenda-topic-proposals',
  templateUrl: './manage-agenda-topic-proposals.component.html',
  styleUrls: ['./manage-agenda-topic-proposals.component.scss']
})
export class ManageAgendaTopicProposals implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
//   @Output() orderCreateEventEmitter = new EventEmitter<Object>();
//   @Input() data;
//   ColumnMode = ColumnMode;
//   createOrderForm: FormGroup;
//   editOrderForm: FormGroup;
//   subjectId: any;
//   showOrdersList = true;
//   showCreateOrderForm = false;
//   departmentsList;
//   rows = [];
//   showEditOrderForm = false;
//   orderId;

//   constructor(
//     private spinner: NgxSpinnerService,
//     private translatedToastr: TranslatedToastrService,
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private activeModal: NgbActiveModal,
//     private departmentService: DepartmentService,
//     private orderService: OrderService,
//     private changeDetector: ChangeDetectorRef,
//     private dateConvert : DateConvertService
//   ) { }

//   ngOnInit(): void {
//     this.subjectId = this.data;
//     this.getOrdersListBySubjectId(this.subjectId);
//     this.getDepartmentsList();
//   }

//   getOrdersListBySubjectId(subjectId) {
//     this.orderService.getSubjectOrders(subjectId).subscribe((response: any) => {
//       console.log('res', response);
//       // this.resolution = response;
//       // this.showResolution = true;
//       this.rows = response;
//       this.changeDetector.detectChanges();
//     }, (error) => {
//       console.log('Error: ', error);
//     });
//   }

//   buildForm() {
//     this.createOrderForm = this.formBuilder.group({
//       orderNumber: [null, Validators.required],
//       orderDate: [null, Validators.required],
//       summary: [null, Validators.required],
//       implementationEndDate: [null, Validators.required],
//       implementingDepartments: [null, Validators.required],
//       assistingDepartments: [null, Validators.required]
//     });
//   }

//   getDepartmentsList() {
//     this.departmentService.getDepartments().subscribe((data) => {
//       this.departmentsList = data;
//       console.log(this.departmentsList);
//     });
//   }

//   showCreateOrderFormDiv() {
//     this.buildForm();
//     this.showCreateOrderForm = true;
//     this.showEditOrderForm = false;
//     this.showOrdersList = false;
//   }

//   showOrdersListDiv() {
//     this.showCreateOrderForm = false;
//     this.showEditOrderForm = false;
//     this.showOrdersList = true;
//   }

//   showEditOrderFormDiv(rowId) {
//     this.orderId = rowId;
//     this.buildEditForm(rowId);
//     this.showCreateOrderForm = false;
//     this.showOrdersList = false;
//   }

//   closeModal() {
//     this.activeModal.close();
//   }

//   buildEditForm(rowId) {
//     this.spinner.show();
//     this.orderService.getRecordById(rowId).subscribe((data: any) => {
//       console.log(data);
//       this.editOrderForm = this.formBuilder.group({
//         editOrderNumber: [data.orderNumber , Validators.required],
//         editOrderDate: [data.orderDate === null? null: this.dateConvert.convertToDariDate(data.orderDate), Validators.required],
//         editSummary: [data.summary, Validators.required],
//         editImplementationEndDate: [data.implementationEndDate === null? null: this.dateConvert.convertToDariDate(data.implementationEndDate), Validators.required],
//         editImplementingDepartments: [data.implementingDepartments.map(item => item.id), Validators.required],
//         editAssistingDepartments: [data.assistingDepartments.map(item => item.id), Validators.required]
//       });
//       this.showEditOrderForm = true;
//       this.spinner.hide();
//     });

//   }

//   onCreateOrderFormSubmit() {
//     console.log("Create order Form Value", this.createOrderForm);
//     if (this.createOrderForm.valid) {
//       this.spinner.show();
//       const { orderNumber, orderDate, summary, implementationEndDate, implementingDepartments, assistingDepartments } = this.createOrderForm.value;
//       this.orderService.saveRecord({
//         orderNumber,
//         orderDate, summary, implementationEndDate,
//         implementingDepartmentsIds: implementingDepartments,
//         assistingDepartmentsIds: assistingDepartments,
//         subjectId: this.subjectId
//       }).subscribe((response) => {
//         if (response) {
//           this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
//           console.log(response);
//           this.getOrdersListBySubjectId(this.subjectId);
//           this.showOrdersListDiv();
//         } else {
//           this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
//           console.log(response);
//         }
//         this.spinner.hide();
//       }, (error) => {
//         this.spinner.hide();
//         this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
//         console.log(error);
//       });
//     }

//     if (this.createOrderForm.invalid) {
//       // To display errors below forms
//       Object.keys(this.createOrderForm.controls).forEach(field => {
//         const control = this.createOrderForm.get(field);
//         control.markAsTouched({ onlySelf: true });
//       });
//     }
//   }

//   onEditFormSubmit() {
//     console.log("Create order Form Value", this.editOrderForm);
//     if (this.editOrderForm.valid) {
//       this.spinner.show();
//       const { editOrderNumber, editOrderDate, editSummary, 
//         editImplementationEndDate, editImplementingDepartments, editAssistingDepartments } = this.editOrderForm.value;
//       this.orderService.editOrder(this.orderId, {
//         orderNumber: editOrderNumber, orderDate: editOrderDate, summary: editSummary, implementationEndDate: editImplementationEndDate,
//         implementingDepartmentsIds: editImplementingDepartments, assistingDepartmentsIds: editAssistingDepartments, subjectId: this.subjectId
//       }).subscribe((response) => {
//         if (response) {
//           this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
//           this.getOrdersListBySubjectId(this.subjectId);
//           this.showOrdersListDiv();
//         } else {
//           this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
//           console.log(response);
//         }
//         this.spinner.hide();
//       }, (error) => {
//         this.spinner.hide();
//         this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
//         console.log(error);
//       });
//     }

//     if (this.editOrderForm.invalid) {
//       // To display errors below forms
//       Object.keys(this.editOrderForm.controls).forEach(field => {
//         const control = this.editOrderForm.get(field);
//         control.markAsTouched({ onlySelf: true });
//       });
//     }
//   }

//   viewOrder(rowId){
//     this.closeModal();
//     this.router.navigate([`order/view/${rowId}`]);
//   }

}