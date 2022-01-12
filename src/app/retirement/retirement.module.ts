import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetirementComponent } from './retirement.component';
import { RetirementListComponent } from './components/retirement_list/list-retirement.component';
import { RouterModule, Routes } from '@angular/router';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

export const routes: Routes = [
	{
		path: '',
		component: RetirementComponent
	}
];

@NgModule({
	declarations: [RetirementComponent, RetirementListComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgbModule,
		NgxDatatableModule,
		PipeModule,
		NgxSpinnerModule,
        TranslateModule,
        FormsModule,
		ReactiveFormsModule,
	]
})
export class RetirementModule { }
