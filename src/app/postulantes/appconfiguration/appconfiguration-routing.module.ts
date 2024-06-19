import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppconfigurationComponent } from './appconfiguration.component';

const routes: Routes = [{ path: '', component: AppconfigurationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppconfigurationRoutingModule { }
