import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulantesComponent } from './postulantes.component';
import { TablaEmpleoComponent } from './tabla-empleo/tabla-empleo.component';
import { AlertasTrabajoComponent } from './alertas-trabajo/alertas-trabajo.component';
import { OfertasDeTrabajoComponent } from './ofertas-de-trabajo/ofertas-de-trabajo.component';
import { MisOfertasComponent } from './mis-ofertas/mis-ofertas.component';
import { SharedModule } from '../../shared/shared.module';
import { MensajeriaComponent } from '../../shared/components/mensajeria/mensajeria.component';


const routes: Routes = [
  { path: 'hub', component: PostulantesComponent,
    children:[
      {path: '', redirectTo: 'TablaOV', pathMatch: 'full'},
      {path: 'ofertas-laborales', component: OfertasDeTrabajoComponent},
      {path: 'TablaOV', component: TablaEmpleoComponent},
      {path: 'AlertasTrabajo', component:AlertasTrabajoComponent},
      {path: 'mis-ofertas', component:MisOfertasComponent},
      {path: 'mensajeria', component:MensajeriaComponent},
      {path: 'appconfiguration', loadChildren: () => import('./appconfiguration/appconfiguration.module').then(m => m.AppconfigurationModule) },
      {path: 'main-UI', loadChildren: () => import('./main-ui/main-ui.module').then(m => m.MainUIModule) },
      {path: 'curriculum', loadChildren: () => import('./curriculum/curriculum.module').then(m => m.CurriculumModule) },
      ]
   },
   {path: '', redirectTo:'hub', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class PostulantesRoutingModule { }
