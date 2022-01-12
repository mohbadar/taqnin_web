import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OrderComponent } from './order.component';
import { FollowUPComponent } from './components/follow_up/follow-up.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import {CreateFollowUpComponent} from './components/follow_up/component/create-follow_up/create-follow-up.component';
import {EditFollowUpComponent} from './components/follow_up/component/edit-follow_up/edit-follow-up.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-ui-switch';
import { HistoryOrderComponent } from './components/history-order/history-order.component';
import { SharedModule } from 'app/template/shared/shared.module';

export const routes: Routes = [
	{
		path: '',
		component: OrderComponent,
		pathMatch:  'full'
	},{
		path: 'view/:id',
		component: ViewOrderComponent,
	 },
	 {
		path: ':id',
		component: EditOrderComponent,
	 },
];

@NgModule({
	declarations: [
		OrderComponent, 
		FollowUPComponent, 
		CreateFollowUpComponent,
		EditFollowUpComponent,
		ViewOrderComponent,
		EditOrderComponent,
		HistoryOrderComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgbModule,
		NgxDatatableModule,
		PipeModule,
        TranslateModule,
		FormsModule,
		UiSwitchModule,
		NgxSpinnerModule,
		ImageCropperModule,
		ReactiveFormsModule,
        ArchwizardModule,
        CustomFormsModule,
		NgSelectModule,
		SharedModule
       
	]
})
export class 
OrderModule { }
