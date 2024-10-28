import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfertantesMensajeriaComponent } from './ofertantes-mensajeria.component';

const routes: Routes = [{ path: '', component: OfertantesMensajeriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertantesMensajeriaRoutingModule { }
