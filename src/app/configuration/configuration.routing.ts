import { Routes } from "@angular/router";

export const ConfigurationRoutes: Routes = [
	// {
	// 	path: 'countries',
	// 	loadChildren: () => import('./country/country.module').then(m => m.CountryModule)
	// },
	// {
	// 	path: 'ministries',
	// 	loadChildren: () => import('./ministry/ministry.module').then(m => m.MinistryModule)
	// },
  {
		path: 'organizations',
		loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule)
	},
	{
		path: 'departments',
		loadChildren: () => import ('../taqnin/department/department.module').then(m => m.DepartmentModule)
	},
  {
		path: 'status',
		loadChildren: () => import ('../taqnin/decision/decision.module').then(m => m.DecisionModule)
	},
	{
		path: 'steps',
		loadChildren: () => import ('../taqnin/step/step.module').then(m => m.StepModule)
	},
  {
		path: 'workflows',
		loadChildren: () => import ('../taqnin/workflow/workflow.module').then(m => m.WorkflowModule)
	},
  {
		path: 'doctypes',
		loadChildren: () => import ('./doctype/doctype.module').then(m => m.DoctypeModule)
	},

	// {
	// 	path: 'authorities',
	// 	loadChildren: () => import('./authority/authority.module').then(m => m.AuthorityModule)
	// }
	// ,
	// {
	// 	path: 'commissions',
	// 	loadChildren: () => import('./commission/commission.module').then(m => m.CommissionModule)
	// },
	// {
	// 	path: 'provinces',
	// 	loadChildren: () => import('./province/province.module').then(m => m.ProvinceModule)
	// }
	// ,
	// {
	// 	path: 'districts',
	// 	loadChildren: () => import('./district/district.module').then(m => m.DistrictModule)
	// },
	// {
	// 	path: 'abstracts',
	// 	loadChildren: () => import('./abstract_setting/abstractSetting.module').then(m => m.AbstractSettingModule)
	// },
	// {
	// 	path: 'shura',
	// 	loadChildren: () => import('./shura/shura.module').then(m => m.ShuraModule)
	// }

];
