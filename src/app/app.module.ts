import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Common/Components/login/login.component';
import { RegisterComponent } from './Common/Components/register/register.component';
import { NavbarComponent } from './Common/Components/navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { PageNotFoundComponent } from './Common/Components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //HERE I CAN IMPORT OTHER MODULES!!!
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
