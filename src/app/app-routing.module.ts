import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { CrearCvComponent } from './postulantes/curriculum/crear-cv/crear-cv.component';
import { EditarCurriculumComponent } from './postulantes/curriculum/editar-curriculum/editar-curriculum.component';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'Postulantes', loadChildren: () => import('./postulantes/postulantes.module').then(m => m.PostulantesModule) },
  { path: 'Ofertantes', loadChildren: () => import('./ofertantes/ofertantes.module').then(m => m.OfertantesModule) },
  {path: 'crear-cv', component: CrearCvComponent },
{path: 'editar-curriculum' , component: EditarCurriculumComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


