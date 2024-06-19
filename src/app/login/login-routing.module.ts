import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginUiComponent } from './login-ui/login-ui.component';

const routes: Routes = [{ path: '', component: LoginComponent,
  children:[
    { path: '', component:LoginUiComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'change-password' , component: ChangePasswordComponent},
    { path: 'register' , component: RegisterComponent}
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
