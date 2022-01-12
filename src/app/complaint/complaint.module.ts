import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from "ngx-ui-switch";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComplaintComponent } from "./complaint.component";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { PipeModule } from "app/template/shared/pipes/pipe.module";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateComplaintComponent } from "./components/create-complaint/create-complaint.component";
import { ArchwizardModule } from "angular-archwizard";
import { EditComplaintComponent } from './edit-complaint/edit-complaint.component';
import { ViewComplaintComponent } from './view-complaint/view-complaint.component';
import { UploadComplaintComponent } from './upload-complaint/upload-complaint.component';
import { DeleteComplaintComponent } from './delete-complaint/delete-complaint.component';
import { SharedModule } from 'app/template/shared/shared.module';
import { HistoryComplaintComponent } from './history-complaint/history-complaint.component';

export const routes: Routes = [
  {
    path: "",
    component: ComplaintComponent,
    pathMatch: "full",
  },
  {
    path: "add",
    component: CreateComplaintComponent,
  },
];

@NgModule({
  declarations: [ComplaintComponent, CreateComplaintComponent, EditComplaintComponent, 
    ViewComplaintComponent, DeleteComplaintComponent, HistoryComplaintComponent,
    UploadComplaintComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
		NgxDatatableModule,
		PipeModule,
    TranslateModule,
		FormsModule,
		UiSwitchModule,
		NgxSpinnerModule,
		ImageCropperModule,
		ReactiveFormsModule,
    ArchwizardModule,
    CustomFormsModule,
		NgSelectModule,
		NgxChartsModule,
    SharedModule
  ],
})
export class ComplaintModule {}
