import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfertantesComponent } from './ofertantes.component';

const routes: Routes = [{ path: '', component: OfertantesComponent }, 
  { path: 'entrevistas', loadChildren: () => import('./entrevistas/entrevistas.module').then(m => m.EntrevistasModule) },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertantesRoutingModule { }
