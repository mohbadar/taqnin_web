import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule } from 'angular-archwizard';
import { CabinetComponent } from './cabinet/cabinet.component';
import { CouncilComponent } from './council/council.component';

const routes: Routes = [
	{
		path: '',
		component: SummaryComponent
	}, {
		path: 'cabinets',
		loadChildren: () => import('./cabinet/cabinet.module').then(m=>m.CabinetModule)
	}, {
		path: 'councils',
		loadChildren: () => import('./council/council.module').then(m=>m.CouncilModule)
	},
];

@NgModule({
  declarations: [SummaryComponent],
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
export class SummaryModule { }
