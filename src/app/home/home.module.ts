import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import {HomeMapComponent} from './map/home-map.component';
import {HomeEthnicComponent} from './ministry_autority_commission/home-ethnic.component';
import {HomeSectComponent} from './sect_dashboard/home-sect.component';
import {HomeGenderComponent} from './gender_dashboard/home-gender.component';
import {HomeAgeComponent} from './age_dashboard/home-age.component';
import {HomeEducationComponent} from './education_dashboard/home-education.component';
import { ChartsRoutingModule } from 'app/template/charts/charts-routing.module';

const routes: Routes = [{
    path: '',
    component: HomeComponent
}];

@NgModule({
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
        
    ],
    declarations: [HomeComponent, HomeMapComponent, HomeEthnicComponent, HomeSectComponent,HomeGenderComponent, 
        HomeAgeComponent, HomeEducationComponent]
})

export class HomeModule { }
