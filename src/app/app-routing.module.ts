import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './pages/auth/OTP/otp-verification.component';
import { authGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule), canActivate: [authGuard] },
  { path: 'Postulantes', loadChildren: () => import('./pages/postulantes/postulantes.module').then(m => m.PostulantesModule) },
  { path: 'Ofertantes', loadChildren: () => import('./pages/ofertantes/ofertantes.module').then(m => m.OfertantesModule) },
  { path: 'Admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'hub', redirectTo: '', pathMatch:'full'},
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/forgot-password/otp', component: OtpVerificationComponent },  // Asegúrate de que esta ruta esté configurada
  { path: '**', redirectTo:"", pathMatch:'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



