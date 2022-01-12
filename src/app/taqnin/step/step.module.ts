import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StepComponent} from './step.component'
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { SharedModule } from 'app/template/shared/shared.module';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import {StepCreateComponent} from './dialogs/step-create/step-create.component';
import {StepDeleteComponent} from './dialogs/step-delete/step-delete.component';
import {StepEditComponent} from './dialogs/step-edit/step-edit.component';
import {StepViewComponent} from './dialogs/step-view/step-view.component';

export const routes: Routes = [
  {
    path: '',
    component: StepComponent,
    pathMatch: 'full'
  },
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
  ],
  declarations: [
StepComponent,
StepCreateComponent,
StepDeleteComponent,
StepEditComponent,
StepViewComponent
  ],
})
export class StepModule { }
