import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports:[MatExpansionModule,MatTableModule,MatIconModule,MatButtonModule]
})
export class MaterialModule { }

