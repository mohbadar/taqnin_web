import { Routes } from '@angular/router';

import { OrganizationComponent } from './organization.component';

export const OrganizationRoutes: Routes = [
    {
        path: '',
        component: OrganizationComponent,
        pathMatch:  'full'
    }
];
