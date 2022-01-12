import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentComponent } from './recruitment.component';
import { EditRecruitmentComponent } from './components/edit-recruitment/edit-recruitment.component';
import { CreateRecruitmentComponent } from './components/create-recruitment/create-recruitment.component';
import { ViewRecruitmentComponent } from './components/view-recruitment/view-recruitment.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
	{
		path: '',
		component: RecruitmentComponent,
		pathMatch:  'full'
  }
  , {
		path: 'add',
		component: CreateRecruitmentComponent
	}, {
		path: ':id',
		component: ViewRecruitmentComponent
	}, {
		path: ':id/edit',
		component: EditRecruitmentComponent
	},
];

@NgModule({
  declarations: [RecruitmentComponent, EditRecruitmentComponent, CreateRecruitmentComponent, ViewRecruitmentComponent],
  imports: [
    CommonModule,
		RouterModule.forChild(routes),
		NgbModule,
		NgxDatatableModule,
		PipeModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
  ]
})
export class RecruitmentModule { }
