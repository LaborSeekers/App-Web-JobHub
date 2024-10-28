import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertantesMensajeriaRoutingModule } from './ofertantes-mensajeria-routing.module';
import { OfertantesMensajeriaComponent } from './ofertantes-mensajeria.component';
import { OfertantesModule } from '../ofertantes.module';
import { MaterialModule } from '../../../shared/material/material.module';


@NgModule({
  declarations: [
    OfertantesMensajeriaComponent
  ],
  imports: [
    CommonModule,
    OfertantesMensajeriaRoutingModule,OfertantesModule,MaterialModule
  ]
})
export class OfertantesMensajeriaModule { }
