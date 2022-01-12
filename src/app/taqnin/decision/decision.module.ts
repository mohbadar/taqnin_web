import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DecisionComponent} from './decision.component'
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DecisionCreateComponent } from './dialogs/decision-create/decision-create.component';
import { DecisionViewComponent } from './dialogs/decision-view/decision-view.component';
import { DecisionEditComponent } from './dialogs/decision-edit/decision-edit.component';
import { DecisionDeleteComponent } from './dialogs/decision-delete/decision-delete.component';
import { SharedModule } from 'app/template/shared/shared.module';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { TagInputModule } from 'ngx-chips';

export const routes: Routes = [
  {
    path: '',
    component: DecisionComponent,
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
    DecisionComponent,
    DecisionCreateComponent,
    DecisionEditComponent,
    DecisionViewComponent,
    DecisionDeleteComponent
  ],
})
export class DecisionModule { }
