import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainUIComponent } from './main-ui.component';
import { CrearCvComponent } from '../curriculum/crear-cv/crear-cv.component';
import { EditarCurriculumComponent } from '../curriculum/editar-curriculum/editar-curriculum.component';
import { EntrevistasComponent } from './entrevistas/entrevistas.component';
import { EntrevistaLobbyComponent } from './entrevista-lobby/entrevista-lobby.component';
const routes: Routes = [{ path: '', children: [{path: 'crear-cv', component: CrearCvComponent },
  {path: 'editar-curriculum' , component: EditarCurriculumComponent},{path: '' , component: EntrevistaLobbyComponent},
  {path: 'entrevistas' , component: EntrevistasComponent},], component: MainUIComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainUIRoutingModule { }
