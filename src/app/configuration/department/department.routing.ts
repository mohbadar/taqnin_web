import { Routes } from '@angular/router';
import { DepartmentComponent } from './department.component';


export const DepartmentRoutes: Routes = [
    {
        path: '',
        component: DepartmentComponent,
        pathMatch:  'full'
    }
];
