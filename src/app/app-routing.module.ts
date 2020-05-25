
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Common/Components/login/login.component';
import { RegisterComponent } from './Common/Components/register/register.component';
import { PageNotFoundComponent } from './Common/Components/page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './Admin/Components/admin-dashboard/admin-dashboard.component';
import { FarmerDashboardComponent } from './Farmer/Components/farmer-dashboard/farmer-dashboard.component';
import { CompanyDashboardComponent } from './Company/Components/company-dashboard/company-dashboard.component';
import { RegistrationRequestsComponent } from './Admin/Components/registration-requests/registration-requests.component';
import { UserListComponent } from './Admin/Components/user-list/user-list.component';
import { ChangePasswordComponent } from './Common/Components/change-password/change-password.component';
import { UserComponent } from './Admin/Components/user/user.component';
import { OrderComponent } from './Company/Components/order/order.component';
import { ProductComponent } from './Company/Components/product/product.component';
import { AddProductComponent } from './Company/Components/add-product/add-product.component';
import { ReportComponent } from './Company/Components/report/report.component';
import { GardenComponent } from './Farmer/Components/garden/garden.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminDashboardComponent},
  { path: 'admin/registration-requests', component: RegistrationRequestsComponent},
  { path: 'admin/user-list' , component: UserListComponent },
  { path: 'admin/user-list/:id' , component: UserComponent },
  { path: 'admin/user-list/add/:role_id' , component: UserComponent },
  { path: 'change-password', component:ChangePasswordComponent },
  { path: 'company', component: CompanyDashboardComponent },
  { path: 'company/orders/:orderId', component: OrderComponent },
  { path: 'company/products/:productId', component: ProductComponent },
  { path: 'company/add-product', component: AddProductComponent },
  { path: 'company/report', component: ReportComponent },
  { path: 'farmer', component: FarmerDashboardComponent },
  { path: 'farmer/garden/:gardenId', component: GardenComponent },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }