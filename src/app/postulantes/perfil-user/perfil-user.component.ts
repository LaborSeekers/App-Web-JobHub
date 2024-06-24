import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.css'
})
export class PerfilUserComponent {
  imageUrl = 'assets/imagenes/Header/Persona1.jpg'; // Reemplaza con la ruta correcta
  showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
