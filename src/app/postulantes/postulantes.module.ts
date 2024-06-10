import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostulantesRoutingModule } from './postulantes-routing.module';
import { PostulantesComponent } from './postulantes.component';
import { TablaEmpleoComponent } from './tabla-empleo/tabla-empleo.component';
import { TablaEmpleoFavComponent } from './tabla-empleo-fav/tabla-empleo-fav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    PostulantesComponent,
    TablaEmpleoComponent,
    TablaEmpleoFavComponent,
    PerfilUserComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    PostulantesRoutingModule, MatIconModule, MatButtonModule,MatTableModule
  ],
  exports:[PostulantesComponent,TablaEmpleoComponent,TablaEmpleoFavComponent,  MatIconModule, MatButtonModule, MatTableModule, HeaderComponent, FooterComponent]
})
export class PostulantesModule { }
