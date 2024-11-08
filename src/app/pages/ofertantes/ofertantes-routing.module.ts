import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfertantesComponent } from './ofertantes.component';
import { OfertasPublicadasComponent } from './ofertas-publicadas/ofertas-publicadas.component';
import { VerPostulantesComponent } from './ver-postulantes/ver-postulantes.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearOfertaComponent } from './crear-oferta/crear-oferta.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SubscriptionCheckComponent } from './subscription-check/subscription-check.component';

const routes: Routes = [{path: 'hub', component: OfertantesComponent,
    children:[
      {path: 'ofertas-publicadas', component: OfertasPublicadasComponent},
      {path: 'crear-ofertas', component: CrearOfertaComponent},
      {path: 'edit/:id', component: CrearOfertaComponent },
      {path: 'ver-postulantes/:offerId', component: VerPostulantesComponent},
      {path: 'inicio', component:InicioComponent },
      {path: 'subscripcion', component:SubscriptionsComponent},
      {path: 'subscripcion/check', component: SubscriptionCheckComponent},
      {path: '', redirectTo:'inicio', pathMatch:'full'},
      {path: 'entrevistas', loadChildren: () => import('./entrevistas/entrevistas.module').then(m => m.EntrevistasModule) },
      { path: 'mensajeria', loadChildren: () => import('./ofertantes-mensajeria/ofertantes-mensajeria.module').then(m => m.OfertantesMensajeriaModule) },
    ]
},
    
   {path: '', redirectTo:'hub', pathMatch:'full'}
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertantesRoutingModule { }