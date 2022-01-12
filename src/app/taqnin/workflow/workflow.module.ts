import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkflowComponent} from './workflow.component'
import { RouterModule, Routes } from '@angular/router';
import { WorkflowCreateComponent } from './components/workflow-create/workflow-create.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/template/shared/shared.module';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkflowDeleteComponent } from './components/workflow-delete/workflow-delete.component';
import { WorkflowEditComponent } from './components/workflow-edit/workflow-edit.component';
import { WorkflowViewComponent } from './components/workflow-view/workflow-view.component';
import { WorkflowTransitionComponent } from './components/workflow-transition/workflow-transition.component';
import { TransitionDeleteComponent } from './components/workflow-transition/transition-delete/transition-delete.component';
import { TransitionEditComponent } from './components/workflow-transition/transition-edit/transition-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: WorkflowComponent,
    pathMatch: 'full'
  },
  {
    path:'view/:id',
    component: WorkflowViewComponent
  },
]
@NgModule({
  declarations: [
    WorkflowComponent,
    WorkflowCreateComponent,
    WorkflowDeleteComponent,
    WorkflowEditComponent,
    WorkflowViewComponent,
    WorkflowTransitionComponent,
    TransitionDeleteComponent,
    TransitionEditComponent
  ],
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
    NgxSpinnerModule,
  ]
})
export class WorkflowModule { }
