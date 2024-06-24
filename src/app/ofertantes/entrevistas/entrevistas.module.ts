import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrevistasRoutingModule } from './entrevistas-routing.module';
import { EntrevistasComponent } from './entrevistas.component';
import { OfertantesModule } from '../ofertantes.module';
import { FooterEntrevistasComponent } from './footer-entrevistas/footer-entrevistas.component';
import { HeaderEntrevistasComponent } from './header-entrevistas/header-entrevistas.component';
import { PerfilEntrevistasComponent } from './perfil-entrevistas/perfil-entrevistas.component';



@NgModule({
  declarations: [
    EntrevistasComponent,
    FooterEntrevistasComponent,
    HeaderEntrevistasComponent,
    PerfilEntrevistasComponent,

  ],
  imports: [
    CommonModule,
    EntrevistasRoutingModule,OfertantesModule
  ]
})
export class EntrevistasModule { }
