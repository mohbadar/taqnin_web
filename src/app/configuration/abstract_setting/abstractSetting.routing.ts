import { Routes } from '@angular/router';

import { AbstractSettingComponent } from './abstractSetting.component';

export const AuthorityRoutes: Routes = [
    {
        path: '',
        component: AbstractSettingComponent,
        pathMatch:  'full'
    }
];
