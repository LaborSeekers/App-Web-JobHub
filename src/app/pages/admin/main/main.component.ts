import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private router: Router){}

  redirigirAEmpresa(){
    this.router.navigate(['/Admin/hub/register-emp']);
  }
  redirigirAUsuario(){
    this.router.navigate(['/Admin/hub/register-user']);

  }
}
