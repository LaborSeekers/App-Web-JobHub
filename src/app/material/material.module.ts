import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';


import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[MatExpansionModule,MatTableModule,MatIconModule,MatButtonModule,MatBadgeModule,MatFormFieldModule,MatInputModule,MatDialogModule
   ]
})
export class MaterialModule { }

