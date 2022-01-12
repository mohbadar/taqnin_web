import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolutionComponent } from './resolution.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateResolutionComponent } from './components/create-resolution/create-resolution.component';
import { EditResolutionComponent } from './components/edit-resolution/edit-resolution.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/template/shared/shared.module';
import { ViewResolutionDetailsComponent } from './components/view-resolution-details/view-resolution-details.component';
import { CreateSubjectComponent } from './components/view-resolution-details/subject/create-subject/create-subject.component';
import { ManageSubjectOrderComponent } from './components/view-resolution-details/subject/manage-subject-order/manage-subject-order.component';
import { ViewSubjectComponent } from './components/view-resolution-details/subject/view-subject/view-subject.component';
import { EditSubjectComponent } from "./components/view-resolution-details/subject/edit-subject/edit-subject.component";
import { DeleteSubjecComponent } from "./components/view-resolution-details/subject/delete-subject/delete-subject.component";

export const routes: Routes = [
  {
    path: '',
    component: ResolutionComponent,
    pathMatch: 'full'
  }, {
    path: 'add',
    component: CreateResolutionComponent,
  }, {
    path: 'view/:id',
    component: ViewResolutionDetailsComponent,
  }, {
    path: "edit/:id",
    component: EditResolutionComponent
  }
];

@NgModule({
  declarations: [
    ResolutionComponent,
    CreateResolutionComponent,
    ViewResolutionDetailsComponent,
    EditResolutionComponent,
    CreateSubjectComponent,
    ManageSubjectOrderComponent,
    ViewSubjectComponent,
    EditSubjectComponent,
    DeleteSubjecComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxDatatableModule,
    PipeModule,
    TranslateModule,
    FormsModule,
    ImageCropperModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ArchwizardModule,
    CustomFormsModule,
    NgSelectModule,
    SharedModule
  ],
  providers: [
    NgbActiveModal
  ]
})
export class ResolutionModule { }
