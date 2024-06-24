import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumComponent } from './curriculum.component';
import { CrearCvComponent } from './crear-cv/crear-cv.component';
import { EditarCurriculumComponent } from './editar-curriculum/editar-curriculum.component';
import { CurriculumLobbyComponent } from './curriculum-lobby/curriculum-lobby.component';
const routes: Routes = [{ path: '', children:[{path: '', component:CurriculumLobbyComponent },
  {path: 'editar-curriculum', component:EditarCurriculumComponent },{path: 'crear-cv', component: CrearCvComponent}], component: CurriculumComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule { }
