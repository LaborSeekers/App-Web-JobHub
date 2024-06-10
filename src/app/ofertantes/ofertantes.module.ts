import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertantesRoutingModule } from './ofertantes-routing.module';
import { OfertantesComponent } from './ofertantes.component';


@NgModule({
  declarations: [
    OfertantesComponent
  ],
  imports: [
    CommonModule,
    OfertantesRoutingModule
  ],
  exports:[OfertantesComponent]
})
export class OfertantesModule { }
