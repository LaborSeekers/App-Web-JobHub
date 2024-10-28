import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppconfigurationRoutingModule } from './appconfiguration-routing.module';
import { AppconfigurationComponent } from './appconfiguration.component';


@NgModule({
  declarations: [
    AppconfigurationComponent
  ],
  imports: [
    CommonModule,
    AppconfigurationRoutingModule
  ]
})
export class AppconfigurationModule { }
