import { WelcomeComponent } from './welcome.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { SharedModule } from './../../template/shared/shared.module';
import { PipeModule } from './../../template/shared/pipes/pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbActiveModal, NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { DocumentViewComponent } from './components/document-view/document-view.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'view/:id',
    component: DocumentViewComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    SharedModule,
    TagInputModule,
    UiSwitchModule
  ],
  declarations: [
    WelcomeComponent,
    DocumentViewComponent
  ],
  providers: [
    NgbActiveModal,
    NgbPaginationConfig
  ]
})
export class WelcomeModule { }
