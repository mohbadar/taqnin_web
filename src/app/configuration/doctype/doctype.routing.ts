import { Routes } from '@angular/router';

import { DoctypeComponent } from './doctype.component';

export const DoctypeRoutes: Routes = [
    {
        path: '',
        component: DoctypeComponent,
        pathMatch:  'full'
    }
];
