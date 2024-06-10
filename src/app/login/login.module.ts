import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    IniciarSesionComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],exports: [
    LoginComponent,
    ForgotPasswordComponent
  ]
})
export class LoginModule { }
