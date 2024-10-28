import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: 'auth', component: AuthComponent,
  children:[
    { path: 'login', component:LoginComponent},
    { path: '', redirectTo:'login', pathMatch:'full'},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'change-password' , component: ChangePasswordComponent},
    { path: 'register' , component: RegisterComponent}
  ]
 },
 { path:'', redirectTo:'auth', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
