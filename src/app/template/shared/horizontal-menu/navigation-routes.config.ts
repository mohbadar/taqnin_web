import { RouteInfo } from "../vertical-menu/vertical-menu.metadata";

export const HROUTES: RouteInfo[] = [
  { path: '', title: 'ANNOUNCEMENTS', icon: 'ft-home', role: 'TAQNIN_ANNOUNCEMENT_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  { path: '/dashboard', title: 'DASHBOARD', icon: 'ft-bar-chart-2', role: 'TAQNIN_DASHBOARD_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  { path: '/documents', title: 'DOCUMENT', icon: 'ft-file', role: 'TAQNIN_DOCUMENT_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  //{ path: '/workflows', title: 'WORKFLOWS', icon: 'ft-menu', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  //{ path: '/decision', title: 'DECISION', icon: 'ft-home', role: 'PROFILE_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  //{ path: '/step', title: 'STEP', icon: 'ft-edit-1', role: 'COMPLAINT_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },

  // { path: '/document', title: 'Document', icon: 'ft-edit-1', role: 'COMPLAINT_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
   //{ path: '/announcements', title: 'ANNOUNCEMENTS', icon: 'ft-info', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/reports', title: 'REPORT', icon: 'ft-copy', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  {
      path: '', title: 'SETTINGS', icon: 'ft ft-settings', role: 'TAQNIN_SETTINGS_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false,
      submenu: [
        { path: '/admin/users', title: 'USER', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        { path: '/admin/groups', title: 'GROUP', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        { path: '/admin/roles', title: 'ROLE', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        { path: '/admin/permissions', title: 'PERMISSION', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
       // { path: '/admin/workflows', title: 'WORKFLOWS', icon: 'ft-arrow-right submenu-icon', role: 'WORKFLOW_LIST', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        // { path: '/admin/sys_reg', title: 'SYSTEM_REGISTRY', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      ]
  },

  {
    path: '', title: 'CONFIGURATIONS', icon: 'ft ft-lock', role: 'TAQNIN_CONFIGURATION_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false,
    submenu: [
      { path: '/configuration/organizations', title: 'ORGANIZATION', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/configuration/departments', title: 'DEPARTMENT', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: []},
      { path: '/configuration/workflows', title: 'WORKFLOW', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: []},
      { path: '/configuration/status', title: 'STATUS', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: []},
      { path: '/configuration/doctypes', title: 'DOCTYPE', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: []},
      // { path: '/configuration/steps', title: 'STEP', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: []},
      // { path: '/configuration/ministries', title: 'MINISTRY', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      // { path: '/configuration/authorities', title: 'AUTHORITY', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      // { path: '/configuration/commissions', title: 'COMMISSION', icon: 'ft-arrow-right submenu-icon', role: '',  class: 'dropdown-item', isExternalLink: false, submenu: [] },
      // { path: '/configuration/countries', title: 'COUNTRY', icon: 'ft-arrow-right submenu-icon', role: '',  class: 'dropdown-item', isExternalLink: false, submenu: [] },
      // { path: '/configuration/provinces', title: 'PROVINCE', icon: 'ft-arrow-right submenu-icon', role: '',  class: 'dropdown-item', isExternalLink: false, submenu: [] },
      // { path: '/configuration/districts', title: 'DISTRICT', icon: 'ft-arrow-right submenu-icon', role: '',  class: 'dropdown-item', isExternalLink: false, submenu: [] },
      // { path: '/configuration/shura', title: 'SHURA', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: []},
      // { path: '/configuration/abstracts', title: 'ABSTRACT', icon: 'ft-arrow-right submenu-icon', role: '',  class: 'dropdown-item', isExternalLink: false, submenu: [] },
    ]
  },

];
