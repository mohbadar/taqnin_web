import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DepartmentComponent } from "./department.component";
import { DepartmentRoutes } from "./department.routing";
import { DepartmentCreateDialogComponent } from "./dialogs/department-create-dialog/department-create-dialog.component";
import { DepartmentEditDialogComponent } from "./dialogs/department-edit-dialog/department-edit-dialog.component";
import { DepartmentViewDialogComponent } from "./dialogs/department-view-dialog/department-view-dialog.component";
import { DepartmentDeleteDialogComponent } from "./dialogs/department-delete-dialog/department-delete-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(DepartmentRoutes),
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  declarations: [
    DepartmentComponent,
    DepartmentCreateDialogComponent,
    DepartmentEditDialogComponent,
    DepartmentViewDialogComponent,
    DepartmentDeleteDialogComponent
  ],
})
export class DepartmentModule {}
