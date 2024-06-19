import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertantesRoutingModule } from './ofertantes-routing.module';
import { OfertantesComponent } from './ofertantes.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    OfertantesComponent
  ],
  imports: [
    CommonModule,
    OfertantesRoutingModule,MaterialModule
  ],
})
export class OfertantesModule { }
