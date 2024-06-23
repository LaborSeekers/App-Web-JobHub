import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { LoginUiComponent } from './login-ui/login-ui.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    IniciarSesionComponent,
    LoginUiComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,MaterialModule
  ],exports: [
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent
  ]
})
export class LoginModule { }
