
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumComponent } from './curriculum.component';
import { CrearCvComponent } from './crear-cv/crear-cv.component'; 
import { PostulantesModule } from '../postulantes.module';
import { EditarCurriculumComponent } from './editar-curriculum/editar-curriculum.component';

@NgModule({
  declarations: [
    CurriculumComponent,
    CrearCvComponent,
    EditarCurriculumComponent
  ],
  imports: [
    CommonModule,
    CurriculumRoutingModule,
    PostulantesModule
  ]
})
export class CurriculumModule { }