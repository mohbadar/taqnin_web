import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DepartmentComponent} from './department.component'
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
import { DepartmentCreateComponent } from './dialogs/department-create/department-create.component';
import { DepartmentDeleteComponent } from './dialogs/department-delete/department-delete.component';
import { DepartmentEditComponent } from './dialogs/department-edit/department-edit.component';
import { DepartmentViewComponent } from './dialogs/department-view/department-view.component';
import { SharedModule } from 'app/template/shared/shared.module';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
export const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent,
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
    DepartmentComponent,
    DepartmentCreateComponent,
    DepartmentDeleteComponent,
    DepartmentEditComponent,
    DepartmentViewComponent
  ],
})
export class DepartmentModule { }
