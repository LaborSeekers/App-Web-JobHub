import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { MensajeriaComponent } from './components/mensajeria/mensajeria.component';
import { FormsModule } from '@angular/forms';
import { VerEmpresaComponent } from './components/ver-empresa/ver-empresa.component'; 



@NgModule({
  declarations: [
    FooterComponent,
    SideMenuComponent,
    MensajeriaComponent,
    VerEmpresaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    FooterComponent, SideMenuComponent, MensajeriaComponent
  ]
})
export class SharedModule { }
