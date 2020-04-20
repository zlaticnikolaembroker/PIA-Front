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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AdminDashboardComponent,
    FarmerDashboardComponent,
    CompanyDashboardComponent
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
