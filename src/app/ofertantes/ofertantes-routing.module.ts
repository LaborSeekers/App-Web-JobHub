import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfertantesComponent } from './ofertantes.component';
import { OfertasPublicadasComponent } from './ofertas-publicadas/ofertas-publicadas.component';
import { VerPostulantesComponent } from './ver-postulantes/ver-postulantes.component';

const routes: Routes = [
    /*testeo*/
    {path: '', component: OfertantesComponent,},
    {path: 'entrevistas', loadChildren: () => import('./entrevistas/entrevistas.module').then(m => m.EntrevistasModule) },
    {path: 'ofertas-publicadas', component: OfertasPublicadasComponent,},
    {path: 'ver-postulantes/:offerId', component: VerPostulantesComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertantesRoutingModule { }
