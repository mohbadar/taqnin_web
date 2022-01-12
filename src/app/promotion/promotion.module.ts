import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from './promotion.component';
import { ViewPromotionComponent } from './components/view-promotion/view-promotion.component';
import { CreatePromotionComponent } from './components/create-promotion/create-promotion.component';
import { EditPromotionComponent } from './components/edit-promotion/edit-promotion.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxSpinnerModule } from 'ngx-spinner';

export const routes: Routes = [
	{
		path: '',
		component: PromotionComponent,
		pathMatch:  'full'
	}, {
		path: 'add',
		component: CreatePromotionComponent
	}, {
		path: ':id',
		component: ViewPromotionComponent
	}, {
		path: ':id/edit',
		component: EditPromotionComponent
	},
];

@NgModule({
	declarations: [PromotionComponent, ViewPromotionComponent, CreatePromotionComponent, EditPromotionComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgbModule,
		NgxDatatableModule,
		PipeModule,
		TranslateModule,
		NgxSpinnerModule,
		FormsModule,
		ReactiveFormsModule,
        CustomFormsModule,
        NgSelectModule,
       
	]
})
export class PromotionModule { }
