import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainUIRoutingModule } from './main-ui-routing.module';
import { MainUIComponent } from './main-ui.component';
import { TablaEmpleoApliComponent } from './tabla-empleo-apli/tabla-empleo-apli.component';
import { PostulantesModule } from '../postulantes.module';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    MainUIComponent,
    TablaEmpleoApliComponent
  ],
  imports: [
    CommonModule,
    MainUIRoutingModule,PostulantesModule,MaterialModule
  ]
})
export class MainUIModule { }
