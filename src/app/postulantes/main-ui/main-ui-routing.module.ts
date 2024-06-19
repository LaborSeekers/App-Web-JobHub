import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainUIComponent } from './main-ui.component';

const routes: Routes = [{ path: '', component: MainUIComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainUIRoutingModule { }
