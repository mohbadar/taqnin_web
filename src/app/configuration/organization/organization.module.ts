import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastrModule } from "ngx-toastr";
import { OrganizationRoutes } from "./organization.routing";
import { OrganizationComponent } from "./organization.component";
import { OrganizationCreateDialogComponent } from "./dialogs/organization-create-dialog/organization-create-dialog.component";
import { OrganizationViewDialogComponent } from "./dialogs/organization-view-dialog/organization-view-dialog.component";
import { OrganizationEditDialogComponent } from "./dialogs/organization-edit-dialog/organization-edit-dialog.component";
import { OrganizationDeleteDialogComponent } from "./dialogs/organization-delete-dialog/organization-delete-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(OrganizationRoutes),
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  declarations: [
    OrganizationComponent,
    OrganizationCreateDialogComponent,
    OrganizationViewDialogComponent,
    OrganizationEditDialogComponent,
    OrganizationDeleteDialogComponent
  ],
})
export class OrganizationModule {}
