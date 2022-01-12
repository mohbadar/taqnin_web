import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalComponent } from './proposal.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProposalComponent } from './components/create-proposal/create-proposal.component';
import { EditProposalComponent } from './components/edit-proposal/edit-proposal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DetailProposalComponent } from './components/detail-proposal/detail-proposal.component';
import { UploadProposalComponent } from './components/upload-proposal/upload-proposal.component';
import { SharedModule } from 'app/template/shared/shared.module';
import { HistoryProposalComponent } from './components/history-proposal/history-proposal.component';
import {CommentProposalComponent} from './components/comment-proposal/comment-proposal.component';
import {CreateCommentProposalComponent} from './components/comment-proposal/component/create-comment-proposal/create-comment-proposal.component';
import {EditCommentProposalComponent} from './components/comment-proposal/component/edit-comment-proposal/edit-comment-proposal.component';
import {FollowUpProposalComponent} from './components/followup-proposal/followup-proposal.component';

export const routes: Routes = [
  {
    path: '',
    component: ProposalComponent,
    pathMatch: 'full'
  }, {
    path: 'add',
    component: CreateProposalComponent,
  }, {
    path: 'edit/:id',
    component: EditProposalComponent,
  }, {
    path: "detail/:id",
    component: DetailProposalComponent
  }
];

@NgModule({
  declarations: [
    ProposalComponent, 
    CreateProposalComponent, 
    DetailProposalComponent,
    EditProposalComponent, 
    UploadProposalComponent,
    CommentProposalComponent,
    HistoryProposalComponent,
    FollowUpProposalComponent,
    CreateCommentProposalComponent,
    EditCommentProposalComponent
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
export class ProposalModule { }
