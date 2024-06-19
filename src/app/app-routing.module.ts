import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password' , component: ChangePasswordComponent},
  { path: 'Postulantes', loadChildren: () => import('./postulantes/postulantes.module').then(m => m.PostulantesModule) },
  { path: 'Ofertantes', loadChildren: () => import('./ofertantes/ofertantes.module').then(m => m.OfertantesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


