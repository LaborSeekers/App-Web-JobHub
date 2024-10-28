import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertantesRoutingModule } from './ofertantes-routing.module';
import { OfertantesComponent } from './ofertantes.component';
import { MaterialModule } from '../../shared/material/material.module';
import { HeaderComponent } from './header/header.component';
import { PerfilUsarioComponent } from './perfil-usario/perfil-usario.component';


import { OfertasPublicadasComponent } from './ofertas-publicadas/ofertas-publicadas.component';
import { OfertasPublicadasModule } from './ofertas-publicadas/ofertas-publicadas.module';
import { VerPostulantesComponent } from './ver-postulantes/ver-postulantes.component';
import { ModalFiltroComponent } from './ver-postulantes/modal-filtro/modal-filtro.component';

import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    OfertantesComponent,
    HeaderComponent,
    PerfilUsarioComponent,
    OfertasPublicadasComponent,
    VerPostulantesComponent,
    ModalFiltroComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    OfertantesRoutingModule,
    MaterialModule,
    MatSelectModule,
    FormsModule,
    SharedModule
  ],
  exports:[HeaderComponent]
})
export class OfertantesModule { }
