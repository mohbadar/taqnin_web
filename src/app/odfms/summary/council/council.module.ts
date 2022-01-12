import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule } from 'angular-archwizard';
import { CouncilComponent } from './council.component';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { CouncilSummaryComponent } from './council-summary/council-summary.component';

const routes: Routes = [
	{
		path: '',
		component: CouncilComponent,
	}, {
		path: ':council',
		component: CouncilSummaryComponent,
	}
];

@NgModule({
	declarations: [CouncilComponent, CouncilSummaryComponent],
	imports: [
		CommonModule,
		ChartsModule,
		ChartistModule,
		NgxChartsModule,
		NgApexchartsModule,
		NgxSpinnerModule,
		TranslateModule,
		RouterModule.forChild(routes),
		NgbModule,
		NgxDatatableModule,
		PipeModule,
		FormsModule,
		UiSwitchModule,
		ReactiveFormsModule,
		ArchwizardModule,
		CustomFormsModule,
		NgSelectModule,
	]
})
export class CouncilModule { }
