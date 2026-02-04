import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Login } from '@/pages/auth/login/login';
import { Dashboard } from '@/pages/dashboard/dashboard';

export const appRoutes: Routes = [
    { path: 'auth', component: Login },
    { path: '', redirectTo: 'auth', pathMatch:'full' },
    //{ path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
    //{ path: '**', redirectTo: 'login' },
    {
        path: '',
        component: AppLayout,
        children: [
            //{ path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },    
            { path: 'dashboard', loadChildren: () => import('./app/pages/dashboard/dashboard.routes') },  
            { path: 'oportunidad', loadChildren: () => import('./app/pages/oportunidad/oportunidad.routes') },   
            { path: 'lead', loadChildren: () => import('./app/pages/lead/lead.routes') },    
            { path: 'accion', loadChildren: () => import('./app/pages/accion/accion.routes') },    
            { path: 'agenda', loadChildren: () => import('./app/pages/agenda/agenda.routes') },     
            { path: 'balance', loadChildren: () => import('./app/pages/balance/balance.routes') }, 
        ]
    },
    // { path: 'landing', component: Landing },
    // { path: 'notfound', component: Notfound },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    // { path: '**', redirectTo: '/notfound' }
];
