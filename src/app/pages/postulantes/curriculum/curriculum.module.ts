
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumComponent } from './curriculum.component';
import { CrearCvComponent } from './crear-cv/crear-cv.component'; 
import { PostulantesModule } from '../postulantes.module';
import { EditarCurriculumComponent } from './editar-curriculum/editar-curriculum.component';
import { CurriculumLobbyComponent } from './curriculum-lobby/curriculum-lobby.component';
import { MaterialModule } from '../../../shared/material/material.module';

@NgModule({
  declarations: [
    CurriculumComponent,
    CrearCvComponent,
    EditarCurriculumComponent,
    CurriculumLobbyComponent
  ],
  imports: [
    CommonModule,
    CurriculumRoutingModule,
    PostulantesModule,
    MaterialModule
  ]
})
export class CurriculumModule { }