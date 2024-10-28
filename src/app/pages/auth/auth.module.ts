import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../../shared/material/material.module';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [
        AuthComponent,
        ForgotPasswordComponent,
        ChangePasswordComponent,
        LoginComponent
    ],
    exports: [
        AuthComponent,
        ForgotPasswordComponent,
        ChangePasswordComponent
    ], imports: [CommonModule,
        AuthRoutingModule, MaterialModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule { }
