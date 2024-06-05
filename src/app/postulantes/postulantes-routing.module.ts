import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulantesComponent } from './postulantes.component';
import { TablaEmpleoComponent } from './tabla-empleo/tabla-empleo.component';
import { TablaEmpleoFavComponent } from './tabla-empleo-fav/tabla-empleo-fav.component';

const routes: Routes = [
  { path: '', component: PostulantesComponent,outlet:'main'},
  { path: '', component: TablaEmpleoComponent,outlet: 'tablaE'}, /*para que la tabla se muestre apenas entres a postulante */
  { path: 'TablaOV', component: TablaEmpleoComponent,outlet: 'tablaE'},
  { path: 'TablaFav', component: TablaEmpleoFavComponent,outlet: 'tablaE'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulantesRoutingModule { }
