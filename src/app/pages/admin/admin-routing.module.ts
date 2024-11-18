import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RegisterEmpComponent } from './register-emp/register-emp.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [{ path: 'hub', component: AdminComponent,
  children:[
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'register-emp', component:RegisterEmpComponent},
      {path: 'register-user', component:RegisterUserComponent},
      {path: 'main', component: MainComponent},
    ]
 },
 {path: '', redirectTo:'hub', pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
