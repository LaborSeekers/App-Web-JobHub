import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertantesRoutingModule } from './ofertantes-routing.module';
import { OfertantesComponent } from './ofertantes.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PerfilUsarioComponent } from './perfil-usario/perfil-usario.component';


import { OfertasPublicadasComponent } from './ofertas-publicadas/ofertas-publicadas.component';
import { OfertasPublicadasModule } from './ofertas-publicadas/ofertas-publicadas.module';
import { VerPostulantesComponent } from './ver-postulantes/ver-postulantes.component';
import { ModalFiltroComponent } from './ver-postulantes/modal-filtro/modal-filtro.component';

import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OfertantesComponent,
    HeaderComponent,
    FooterComponent,
    PerfilUsarioComponent
    OfertasPublicadasComponent,
    VerPostulantesComponent,
    ModalFiltroComponent,
  ],
  imports: [
    CommonModule,
    OfertantesRoutingModule,
    MaterialModule,
    MatSelectModule,
    FormsModule
  ],
})
export class OfertantesModule { }
