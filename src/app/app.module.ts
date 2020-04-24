import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Common/Components/login/login.component';
import { RegisterComponent } from './Common/Components/register/register.component';
import { NavbarComponent } from './Common/Components/navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { PageNotFoundComponent } from './Common/Components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './Admin/Components/admin-dashboard/admin-dashboard.component';
import { FarmerDashboardComponent } from './Farmer/farmer-dashboard/farmer-dashboard.component';
import { CompanyDashboardComponent } from './Company/company-dashboard/company-dashboard.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegistrationRequestsComponent } from './Admin/Components/registration-requests/registration-requests.component';
import { UserListComponent } from './Admin/Components/user-list/user-list.component';
import { ChangePasswordComponent } from './Common/Components/change-password/change-password.component';
import { UserComponent } from './Admin/Components/user/user.component';
import { AdminComponent } from './Admin/Components/admin/admin.component';
import { FarmerComponent } from './Admin/Components/farmer/farmer.component';
import { CompanyComponent } from './Admin/Components/company/company.component';

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
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
