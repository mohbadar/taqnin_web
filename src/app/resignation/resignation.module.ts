import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResignationComponent } from './resignation.component';
import { ViewResignationComponent } from './components/view-resignation/view-resignation.component';
import { CreateResignationComponent } from './components/create-resignation/create-resignation.component';
import { EditResignationComponent } from './components/edit-resignation/edit-resignation.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

export const routes: Routes = [
	{
		path: '',
		component: ResignationComponent,
		pathMatch:  'full'
	}, {
		path: 'add',
		component: CreateResignationComponent
	}, {
		path: ':id',
		component: ViewResignationComponent
	}, {
		path: ':id/edit',
		component: EditResignationComponent
	},
];



@NgModule({
  declarations: [ResignationComponent, ViewResignationComponent, CreateResignationComponent, EditResignationComponent],
  imports: [
    CommonModule,
		RouterModule.forChild(routes),
		NgbModule,
		NgxDatatableModule,
		NgxSpinnerModule,
		PipeModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ResignationModule { }
