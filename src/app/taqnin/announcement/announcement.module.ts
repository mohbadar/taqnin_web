import { AnnouncementEditComponent } from './dialogs/announcement-edit/announcement-edit.component';
import { AnnouncementCreateComponent } from './dialogs/announcement-create/announcement-create.component';

import { MainAnnouncementEditComponent } from './dialogs/main-announcement-edit/main-announcement-edit.component';
import { MainAnnouncementCreateComponent } from './dialogs/main-announcement-create/main-announcement-create.component';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnnouncementComponent} from './announcement.component'
import { RouterModule, Routes } from '@angular/router';
import { NgbActiveModal, NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/template/shared/shared.module';
import { TagInputModule } from 'ngx-chips';
import { AnnouncementDeleteComponent } from './components/announcement-delete/announcement-delete.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { QuillModule } from 'ngx-quill';
import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import { AnnouncementViewComponent } from './dialogs/announcement-view/announcement-view.component';
import { AnnouncementDetailsViewComponent } from './components/announcement-details-view/announcement-details-view.component';


export const routes: Routes = [
  {
    path: '',
    component: AnnouncementComponent,
    pathMatch: 'full'
  },
  {
    path: 'announcements',
    component: AnnouncementComponent,
    pathMatch: 'full'
  },
  {
    path: 'list',
    redirectTo: 'announcements/list'
  },
  {
    path: 'announcements/list',
    component: AnnouncementListComponent
  },
  {
    path: 'view/:id',
    redirectTo: 'announcements/view/:id'
  },
  {
    path: 'announcements/view/:id',
    component: AnnouncementDetailsViewComponent
  }

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxDatatableModule,
    PipeModule,
    TranslateModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ArchwizardModule,
    CustomFormsModule,
    NgSelectModule,
    SharedModule,
    TagInputModule,
    SwiperModule,
    QuillModule.forRoot()
  ],
  declarations: [
    AnnouncementComponent,
    AnnouncementDeleteComponent,
    MainAnnouncementCreateComponent,
    MainAnnouncementEditComponent,
    AnnouncementListComponent,
    AnnouncementCreateComponent,
    AnnouncementEditComponent,
    AnnouncementViewComponent,
    AnnouncementDetailsViewComponent
  ],
  providers: [
    NgbActiveModal,
    NgbPaginationConfig
  ]
})
export class AnnouncementModule { }
