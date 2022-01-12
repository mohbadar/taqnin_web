import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./template/layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./template/layouts/content/content-layout.component";
import { Full_ROUTES } from "./template/shared/routes/full-layout.routes";
// import { CONTENT_ROUTES } from "./template/shared/routes/content-layout.routes";

import { AuthGuard } from './template/shared/auth/auth-guard.service';
import { SummaryComponent } from './taqnin/summary/summary.component';

const appRoutes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./taqnin/announcement/announcement.module').then(m => m.AnnouncementModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./taqnin/summary/taqnin-summary.module').then(m => m.TaqninSummaryModule)
      },
      // {
      //   path: 'workflows',
      //   loadChildren: () => import('./taqnin/workflow/workflow.module').then(m=>m.WorkflowModule)
      // },
      // {
      //   path: 'steps',
      //   loadChildren: () => import('./taqnin/step/step.module').then(m => m.StepModule)
      // },
      {
        path: 'reports',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
      },
      // {
      //   path: 'announcements',
      //   loadChildren: () => import('./taqnin/announcement/announcement.module').then(m => m.AnnouncementModule)
      // },
      // {
      //   path: 'profiles',
      //   loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      // },
      // {
      //   path: 'promotions',
      //   loadChildren: () => import('./promotion/promotion.module').then(m => m.PromotionModule)
      // },
      // {
      //   path: 'proposal',
      //   loadChildren: () => import('./odfms/proposal/proposal.module').then(m => m.ProposalModule)
      // },
      // {
      //   path: 'step',
      //   loadChildren: () => import('./taqnin/step/step.module').then(m => m.StepModule)
      // },
      // {
      //   path: 'resignations',
      //   loadChildren: () => import('./resignation/resignation.module').then(m => m.ResignationModule)
      // },
      // {
      //   path: 'retirements',
      //   loadChildren: () => import('./retirement/retirement.module').then(m => m.RetirementModule)
      // },
      // {
      //   path: 'complaints',
      //   loadChildren: () => import('./complaint/complaint.module').then(m =>m.ComplaintModule)
      // },
      {
        path: 'documents',
        loadChildren: () => import('../app/taqnin/document/document.module').then(m=>m.TaqninDocumentModule)
      },
      // {
      //   path: 'decision',
      //   loadChildren: () => import('../app/taqnin/decision/decision.module').then(m=>m.DecisionModule)
      // },
      // {
      //   path: 'workflows',
      //   loadChildren: () => import('./taqnin/workflow/workflow.module').then(m=>m.WorkflowModule)
      // },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m =>m.AdminModule)
      },
    {
      path: 'configuration',
      loadChildren: () => import('./configuration/configuration.module').then(m =>m.ConfigurationModule)
    },
    {
      path: 'editprofiles',
      loadChildren: () => import('./edit_profile_menu_bar/edit_profile_menu_bar.module').then(m=>m.EditProfileMenuBarModule)
    }

    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '', component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: [
      {
      path: '',
      loadChildren: () => import('./public-pages/public-pages.module').then(m => m.PublicPagesModule)
    },
    // {
    //   path: 'welcome',
    //   loadChildren: () => import('./taqnin/welcome/welcome.module').then(m => m.WelcomeModule)
    // },
  ]
  },
  { path: 'template', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  // { path: 'template', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
