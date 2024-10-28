import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'Postulantes', loadChildren: () => import('./pages/postulantes/postulantes.module').then(m => m.PostulantesModule) },
  { path: 'Ofertantes', loadChildren: () => import('./pages/ofertantes/ofertantes.module').then(m => m.OfertantesModule) },
  { path: 'hub', redirectTo: '', pathMatch:'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


