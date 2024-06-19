import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Postulantes', loadChildren: () => import('./postulantes/postulantes.module').then(m => m.PostulantesModule) },
  { path: 'Ofertantes', loadChildren: () => import('./ofertantes/ofertantes.module').then(m => m.OfertantesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


