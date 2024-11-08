import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertantesRoutingModule } from './ofertantes-routing.module';
import { OfertantesComponent } from './ofertantes.component';
import { MaterialModule } from '../../shared/material/material.module';
import { HeaderComponent } from './header/header.component';
import { PerfilUsarioComponent } from './perfil-usario/perfil-usario.component';


import { OfertasPublicadasComponent } from './ofertas-publicadas/ofertas-publicadas.component';
import { VerPostulantesComponent } from './ver-postulantes/ver-postulantes.component';
import { ModalFiltroComponent } from './ver-postulantes/modal-filtro/modal-filtro.component';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { SharedModule } from '../../shared/shared.module';
import { CrearOfertaComponent } from './crear-oferta/crear-oferta.component';
import { REACTIVE_NODE } from '@angular/core/primitives/signals';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SubscriptionsModalComponent } from './subscriptions-modal/subscriptions-modal.component';
import { SubscriptionCheckComponent } from './subscription-check/subscription-check.component';
import { VerEmpresaComponent } from '../../shared/components/ver-empresa/ver-empresa.component';

@NgModule({
  declarations: [
    OfertantesComponent,
    HeaderComponent,
    PerfilUsarioComponent,
    OfertasPublicadasComponent,
    VerPostulantesComponent,
    ModalFiltroComponent,
    InicioComponent,
    CrearOfertaComponent,
    DetailsDialogComponent,
    SubscriptionsComponent,
    SubscriptionsModalComponent,
    SubscriptionCheckComponent
  ],
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule,
    OfertantesRoutingModule,
    MaterialModule,
    MatSelectModule,
    FormsModule,
    SharedModule,
    
  ],
  exports:[HeaderComponent]
})
export class OfertantesModule { }
