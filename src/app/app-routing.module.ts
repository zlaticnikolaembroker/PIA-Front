
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Common/Components/login/login.component';
import { RegisterComponent } from './Common/Components/register/register.component';
import { PageNotFoundComponent } from './Common/Components/page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './Admin/Components/admin-dashboard/admin-dashboard.component';
import { FarmerDashboardComponent } from './Farmer/farmer-dashboard/farmer-dashboard.component';
import { CompanyDashboardComponent } from './Company/company-dashboard/company-dashboard.component';
import { RegistrationRequestsComponent } from './Admin/registration-requests/registration-requests.component';
import { UserListComponent } from './Admin/user-list/user-list.component';
import { ChangePasswordComponent } from './Common/Components/change-password/change-password.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminDashboardComponent},
  { path: 'admin/registration-requests', component: RegistrationRequestsComponent},
  { path: 'admin/user-list' , component: UserListComponent },
  { path: 'change-password', component:ChangePasswordComponent },
  { path: 'company', component: CompanyDashboardComponent },
  { path: 'farmer', component: FarmerDashboardComponent },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }