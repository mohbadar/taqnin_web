import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [{
    path: '',
    component: ReportComponent
}];

@NgModule({
    imports: [
        CommonModule,
        ChartsModule,
        ChartistModule,
        TranslateModule,
        RouterModule.forChild(routes),
        CommonModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    declarations: [ReportComponent]
})

export class ReportModule { }
