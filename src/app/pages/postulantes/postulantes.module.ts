import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostulantesRoutingModule } from './postulantes-routing.module';
import { PostulantesComponent } from './postulantes.component';
import { TablaEmpleoComponent } from './tabla-empleo/tabla-empleo.component';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../../shared/material/material.module';
import { DetalleDialogComponent } from './detalle-dialog/detalle-dialog.component';
import { ReputacionDialogComponent } from './reputacion-dialog/reputacion-dialog.component';
import { AlertasTrabajoComponent } from './alertas-trabajo/alertas-trabajo.component';
import { SharedModule } from '../../shared/shared.module';
import { TablaOfertasComponent } from './tabla-ofertas/tabla-ofertas.component';
import { OfertasDeTrabajoComponent } from './ofertas-de-trabajo/ofertas-de-trabajo.component';
import { MisOfertasComponent } from './mis-ofertas/mis-ofertas.component';
import { CategoryChartDialogComponent } from './ofertas-de-trabajo/category-chart-dialog.component';



@NgModule({
  declarations: [
    CategoryChartDialogComponent,
    PostulantesComponent,
    TablaEmpleoComponent,
    PerfilUserComponent,
    HeaderComponent,
    DetalleDialogComponent,
    ReputacionDialogComponent,
    AlertasTrabajoComponent,
    TablaOfertasComponent,
    OfertasDeTrabajoComponent,
    MisOfertasComponent
  ],
  imports: [
    CommonModule,
    PostulantesRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports:[HeaderComponent]
})
export class PostulantesModule { }
