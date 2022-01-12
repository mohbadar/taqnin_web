import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [{
  path: '',
  component: SummaryComponent
}];

@NgModule({
  declarations: [
    SummaryComponent
  ],
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
export class TaqninSummaryModule { }
