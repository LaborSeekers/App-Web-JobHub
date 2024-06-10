import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainUIRoutingModule } from './main-ui-routing.module';
import { MainUIComponent } from './main-ui.component';
import { TablaEmpleoApliComponent } from './tabla-empleo-apli/tabla-empleo-apli.component';
import { PostulantesModule } from '../postulantes.module';

@NgModule({
  declarations: [
    MainUIComponent,
    TablaEmpleoApliComponent
  ],
  imports: [
    CommonModule,
    MainUIRoutingModule,PostulantesModule
  ]
})
export class MainUIModule { }
