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
import { DoctypeRoutes } from "./doctype.routing";
import { DoctypeComponent } from "./doctype.component";
import { DoctypeCreateDialogComponent } from "./dialogs/doctype-create-dialog/doctype-create-dialog.component";
import { DoctypeViewDialogComponent } from "./dialogs/doctype-view-dialog/doctype-view-dialog.component";
import { DoctypeEditDialogComponent } from "./dialogs/doctype-edit-dialog/doctype-edit-dialog.component";
import { DoctypeDeleteDialogComponent } from "./dialogs/doctype-delete-dialog/doctype-delete-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(DoctypeRoutes),
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  declarations: [
    DoctypeComponent,
    DoctypeCreateDialogComponent,
    DoctypeViewDialogComponent,
    DoctypeEditDialogComponent,
    DoctypeDeleteDialogComponent
  ],
})
export class DoctypeModule {}
