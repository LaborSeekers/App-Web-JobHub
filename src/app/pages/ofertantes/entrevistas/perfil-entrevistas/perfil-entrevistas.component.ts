import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-entrevistas',
  templateUrl: './perfil-entrevistas.component.html',
  styleUrl: './perfil-entrevistas.component.css'
})
export class PerfilEntrevistasComponent {
  imageUrl = 'assets/imagenes/Header/Persona1.jpg'; // Reemplaza con la ruta correcta
  showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
