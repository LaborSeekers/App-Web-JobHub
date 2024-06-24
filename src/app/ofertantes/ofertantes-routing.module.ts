import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfertantesComponent } from './ofertantes.component';
import { OfertasPublicadasComponent } from './ofertas-publicadas/ofertas-publicadas.component';
import { VerPostulantesComponent } from './ver-postulantes/ver-postulantes.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [{path: '', component: OfertantesComponent,
    children:[

      {path: 'ofertas-publicadas', component: OfertasPublicadasComponent},
      {path: 'ver-postulantes/:offerId', component: VerPostulantesComponent},
      {path: '',component:InicioComponent},
      {path:'inicio',component:InicioComponent }

    ]
},
    {path: 'entrevistas', loadChildren: () => import('./entrevistas/entrevistas.module').then(m => m.EntrevistasModule) },
    { path: 'Ofertantes_Mensajeria', loadChildren: () => import('./ofertantes-mensajeria/ofertantes-mensajeria.module').then(m => m.OfertantesMensajeriaModule) },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertantesRoutingModule { }
