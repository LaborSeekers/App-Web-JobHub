import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulantesComponent } from './postulantes.component';
import { TablaEmpleoComponent } from './tabla-empleo/tabla-empleo.component';
import { TablaEmpleoFavComponent } from './tabla-empleo-fav/tabla-empleo-fav.component';
import { AlertasTrabajoComponent } from './alertas-trabajo/alertas-trabajo.component';


const routes: Routes = [
  { path: '', component: PostulantesComponent,
    children:[
      {path: '', component: TablaEmpleoComponent},
      {path: 'TablaOV', component: TablaEmpleoComponent},
      {path: 'TablaFav', component: TablaEmpleoFavComponent},
      {path: 'AlertasTrabajo', component:AlertasTrabajoComponent},
      {path: 'appconfiguration', loadChildren: () => import('./appconfiguration/appconfiguration.module').then(m => m.AppconfigurationModule) },
      ]
   },
   {path: 'main-UI', loadChildren: () => import('./main-ui/main-ui.module').then(m => m.MainUIModule) },
   {path: 'curriculum', loadChildren: () => import('./curriculum/curriculum.module').then(m => m.CurriculumModule) },
    /*Aqui debe ir el componente Curriculum en el futuro */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulantesRoutingModule { }
