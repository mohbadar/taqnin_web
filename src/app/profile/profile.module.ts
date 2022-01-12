import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {AddEducationComponent} from './components/details-profile/component/add-education-profile/add-education.component';
import {EditEducationComponent} from './components/details-profile/component/edit-education-profile/edit-education.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { DetailsProfileComponent } from './components/details-profile/details-profile.component';
import { PhotoProfileComponent } from './components/details-profile/component/photo-details-profile/photo-profile.component';
import { EditProfileComponent } from './components/details-profile/component/edit-details-profile/edit-profile.component';
import { ChecklistDetailsComponent } from './components/details-profile/component/checklist-details/checklist-details.component';
import {AddAcademicDegreeComponent} from './components/details-profile/component/add-academic-degree-profile/add-academic-degree.component';
import {EditAcademicDegreeComponent} from './components/details-profile/component/edit-academic-degree-profile/edit-academic-degree.component';
import {AddPublicationComponent} from './components/details-profile/component/add-publication-profile/add-publication.component';
import {EditPublicationComponent} from './components/details-profile/component/edit-publication-profile/edit-publication.component';
import {AddHonoraryComponent} from './components/details-profile/component/add-honorary-profile/add-honorary.component';
import {EditHonoraryComponent} from './components/details-profile/component/edit-honorary-profile/edit-honorary.component';
import {DocumentProfileComponent} from './components/details-profile/component/document-details-profile/document-profile.component';
import {AddMedalComponent} from './components/details-profile/component/add-medal-profile/add-medal.component';
import {EditMedalComponent} from './components/details-profile/component/edit-medal-profile/edit-medal.component';
import {AddRewardComponent} from './components/details-profile/component/add-reward-profile/add-reward.component';
import {EditRewardComponent} from './components/details-profile/component/edit-reward-profile/edit-reward.component';
import {AddPaneltyComponent} from './components/details-profile/component/add-panelty-profile/add-panelty.component';
import {EditPaneltyComponent} from './components/details-profile/component/edit-panelty-profile/edit-panelty.component';
import {AddTravelComponent} from './components/details-profile/component/add-travel-profile/add-travel.component';
import {AddFamilyComponent} from './components/details-profile/component/add-family-profile/add-family.component';
import {EditFamilyComponent} from './components/details-profile/component/edit-family-profile/edit-family.component';
import {AddMedicalComponent} from './components/details-profile/component/add-medical-profile/add-medical.component';
import {EditMedicalComponent} from './components/details-profile/component/edit-medical-profile/edit-medical.component';
import {AddMilitaryComponent} from './components/details-profile/component/add-military-profile/add-military.component';
import {EditMilitaryComponent} from './components/details-profile/component/edit-military-profile/edit-military.component';
import {EditTravelComponent} from './components/details-profile/component/edit-travel-profile/edit-travel.component';
import {AddCrimeComponent} from './components/details-profile/component/add-crime-profile/add-crime.component';
import {EditCrimeComponent} from './components/details-profile/component/edit-crime-profile/edit-crime.component';
import {AddSalaryComponent} from './components/details-profile/component/add-salary-profile/add-salary.component';
import {EditSalaryComponent} from './components/details-profile/component/edit-salary-profile/edit-salary.component';
import {AddTransferComponent} from './components/details-profile/component/add-transfer-profile/add-transfer.component';
import {AddPromotionProfileComponent} from './components/details-profile/component/add-promotion-profile/add-promotion-profile.component';
import {AddFiredComponent} from './components/details-profile/component/add-fired-profile/add-fired.component';
import {SettingDetailsComponent} from './components/details-profile/component/setting-details-profile/setting-details.component';
import {AddTrainingComponent} from './components/details-profile/component/add-training-profile/add-training.component';
import {EditTrainingComponent} from './components/details-profile/component/edit-training-profile/edit-training.component';
import {PrintProfileComponent} from './components/details-profile/component/add-print-profile/print-profile.component';
import {AddAccountablityComponent} from './components/details-profile/component/add-acountability-profile/add-accountability.component';
import {EditAccountablityComponent} from './components/details-profile/component/edit-accountability-profile/edit-accountability.component';
import {EditFiredComponent} from './components/details-profile/component/edit-fired-profile/edit-fired.component';
import {EditPromotionProfileComponent} from './components/details-profile/component/edit-promotion-profile/edit-promotion-profile.component';
import {EditTransferComponent} from './components/details-profile/component/edit-transfer-profile/edit-transfer.component';
import {AddPartyComponent} from './components/details-profile/component/add-political-party-profile/add-party.component';
import {EditPartyComponent} from './components/details-profile/component/edit-political-party-profile/edit-party.component';
import {ApproveProfileComponent} from './components/details-profile/component/approve-profile/approve-profile.component';
import {AddJobBreakComponent} from './components/details-profile/component/add-job-break-profile/add-job-break.component';
import {EditJobBreakComponent} from './components/details-profile/component/edit-job-break-profile/edit-job-break.component';
import {AddRetirementComponent} from './components/details-profile/component/add-retirement-profile/add-retirement.component';
import {EditRetirementComponent} from './components/details-profile/component/edit-retirement-profile/edit-retirement.component';
import {HistoryEducationComponent} from './components/details-profile/component/history-education-profile/history-history.component';
import {HistoryProfileJobComponent} from './components/details-profile/component/history-profileJob-profile/history-profilejob.component';
import {HistoryTrainingComponent} from './components/details-profile/component/history-training-profile/history-training.component';
import {HistoryRewardComponent} from './components/details-profile/component/history-reward-profile/history-reward.component';
import {HistoryProfileComponent} from './components/history-profile/history-profile.component';
import {JalaliPipe} from 'app/pipes/jalali.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from 'app/template/shared/shared.module';

export const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		pathMatch:  'full'
	}, {
		path: 'add',
		component: CreateProfileComponent
	}, {
		path: ':id',
		component: ViewProfileComponent
	}, {
		path: ':id/details',
		component: DetailsProfileComponent
	},
];

@NgModule({
	declarations: [ProfileComponent, CreateProfileComponent, ViewProfileComponent,SettingDetailsComponent,AddTrainingComponent,EditTrainingComponent, PrintProfileComponent, EditFiredComponent,EditPromotionProfileComponent,AddRetirementComponent,EditRetirementComponent,
		 DetailsProfileComponent,PhotoProfileComponent, EditProfileComponent, AddEducationComponent, EditEducationComponent,ChecklistDetailsComponent, AddAccountablityComponent,EditAccountablityComponent,AddPartyComponent, AddJobBreakComponent,HistoryProfileComponent,
		 AddAcademicDegreeComponent, EditAcademicDegreeComponent, AddPublicationComponent, EditPublicationComponent,AddHonoraryComponent,EditHonoraryComponent,AddRewardComponent,AddFiredComponent, EditTransferComponent,EditPartyComponent,EditJobBreakComponent,HistoryProfileJobComponent,HistoryTrainingComponent,
		 EditRewardComponent, DocumentProfileComponent, AddPaneltyComponent, EditPaneltyComponent, AddMedalComponent, EditMedalComponent, AddFamilyComponent,AddCrimeComponent, AddSalaryComponent,AddTransferComponent, ApproveProfileComponent,HistoryEducationComponent,HistoryRewardComponent,
		 EditFamilyComponent, AddMedicalComponent, EditMedicalComponent, AddMilitaryComponent, EditMilitaryComponent, AddTravelComponent, EditTravelComponent, EditCrimeComponent, EditSalaryComponent, AddPromotionProfileComponent],
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
		NgxChartsModule,
		SharedModule
       
	]
})
export class ProfileModule { }
