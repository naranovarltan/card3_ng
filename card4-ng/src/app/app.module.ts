import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistationComponent } from './auth/registation/registation.component';
import { AuthComponent } from './auth/auth.component';
import { SystemComponent } from './system/system.component';
import { RegistrationComponent } from './auth/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistationComponent,
    AuthComponent,
    SystemComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
