import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Common/Components/login/login.component';
import { RegisterComponent } from './Common/Components/register/register.component';
import { NavbarComponent } from './Common/Components/navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { PageNotFoundComponent } from './Common/Components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './Admin/Components/admin-dashboard/admin-dashboard.component';
import { FarmerDashboardComponent } from './Farmer/Components/farmer-dashboard/farmer-dashboard.component';
import { CompanyDashboardComponent } from './Company/Components/company-dashboard/company-dashboard.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegistrationRequestsComponent } from './Admin/Components/registration-requests/registration-requests.component';
import { UserListComponent } from './Admin/Components/user-list/user-list.component';
import { ChangePasswordComponent } from './Common/Components/change-password/change-password.component';
import { UserComponent } from './Admin/Components/user/user.component';
import { AdminComponent } from './Admin/Components/admin/admin.component';
import { FarmerComponent } from './Admin/Components/farmer/farmer.component';
import { CompanyComponent } from './Admin/Components/company/company.component';
import { ProductComponent } from './Company/Components/product/product.component';
import { OrderComponent } from './Company/Components/order/order.component';
import { AddProductComponent } from './Company/Components/add-product/add-product.component';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportComponent } from './Company/Components/report/report.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AdminDashboardComponent,
    FarmerDashboardComponent,
    CompanyDashboardComponent,
    RegistrationRequestsComponent,
    UserListComponent,
    ChangePasswordComponent,
    UserComponent,
    AdminComponent,
    FarmerComponent,
    CompanyComponent,
    ProductComponent,
    OrderComponent,
    AddProductComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    MatStepperModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService,FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
