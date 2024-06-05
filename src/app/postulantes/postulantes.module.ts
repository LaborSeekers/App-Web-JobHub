import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostulantesRoutingModule } from './postulantes-routing.module';
import { PostulantesComponent } from './postulantes.component';
import { TablaEmpleoComponent } from './tabla-empleo/tabla-empleo.component';
import { TablaEmpleoFavComponent } from './tabla-empleo-fav/tabla-empleo-fav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    PostulantesComponent,
    TablaEmpleoComponent,
    TablaEmpleoFavComponent
  ],
  imports: [
    CommonModule,
    PostulantesRoutingModule, MatIconModule, MatButtonModule,MatTableModule
  ],
  exports:[PostulantesComponent]
})
export class PostulantesModule { }
