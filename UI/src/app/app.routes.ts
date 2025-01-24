import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginRegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'view', component: ViewDataComponent },
  // { path: '', redirectTo: 'maintenance', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  // { path: '**', component: PageNotFoundComponent },
];
