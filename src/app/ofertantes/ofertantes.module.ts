import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertantesRoutingModule } from './ofertantes-routing.module';
import { OfertantesComponent } from './ofertantes.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PerfilUsarioComponent } from './perfil-usario/perfil-usario.component';



@NgModule({
  declarations: [
    OfertantesComponent,HeaderComponent,FooterComponent,PerfilUsarioComponent
  ],
  imports: [
    CommonModule,
    OfertantesRoutingModule,
    MaterialModule,
  ]
})
export class OfertantesModule { }
