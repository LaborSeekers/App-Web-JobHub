import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';

const routes: Routes = [{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
