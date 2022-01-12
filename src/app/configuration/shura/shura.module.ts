import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ShuraRoutes } from "./shura.routing";
import { ShuraCreateDialogComponent } from "./dialogs/shura-create-dialog/shura-create-dialog.component";
import { ShuraComponent } from "./shura.component";
import { ShuraEditDialogComponent } from "./dialogs/shura-edit-dialog/shura-edit-dialog.component";
import { ShuraDeleteDialogComponent } from "./dialogs/shura-delete-dialog/shura-delete-dialog.component";
import { ShuraViewDialogComponent } from "./dialogs/shura-view-dialog/shura-view-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(ShuraRoutes),
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  declarations: [
    ShuraComponent,
    ShuraCreateDialogComponent,
    ShuraEditDialogComponent,
    ShuraDeleteDialogComponent,
    ShuraViewDialogComponent
  ],
})
export class ShuraModule {}
