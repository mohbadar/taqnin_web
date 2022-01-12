import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import { CreateAgendaComponent } from './components/create-agenda/create-agenda.component';
import { EditAgendaComponent } from './components/edit-agenda/edit-agenda.component';
import { RouterModule, Routes } from '@angular/router';
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
import { TagInputModule } from 'ngx-chips';
import { SearchSelectProposalComponent } from './components/search-select-proposal/search-select-proposal.component';
import { ViewAgendaDetailsComponent } from './components/view-agenda-details/view-agenda-details.component';
import { ViewTopicComponent } from './components/view-agenda-details/view-topic/view-topic.component';
import { EditTopicComponent } from './components/view-agenda-details/edit-topic/edit-topic.component';
import { ManageAgendaTopicProposals } from './components/view-agenda-details/manage-agenda-topic-proposals/manage-agenda-topic-proposals.component';

export const routes: Routes = [
  {
    path: '',
    component: AgendaComponent,
    pathMatch: 'full'
  }, {
    path: 'add',
    component: CreateAgendaComponent,
  }, {
    path: 'view/:id',
    component: ViewAgendaDetailsComponent,
  }, {
    path: ":id/edit",
    component: EditAgendaComponent
  }
];


@NgModule({
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
    SharedModule,
    TagInputModule,
  ],
  declarations: [
    AgendaComponent, 
    ViewAgendaDetailsComponent, 
    CreateAgendaComponent, 
    EditAgendaComponent, 
    SearchSelectProposalComponent,
    ViewTopicComponent,
    EditTopicComponent,
    ManageAgendaTopicProposals
  ],
  providers: [
    NgbActiveModal
  ]
})
export class AgendaModule { }
