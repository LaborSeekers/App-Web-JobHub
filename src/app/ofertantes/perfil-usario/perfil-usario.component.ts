import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-usario',
  templateUrl: './perfil-usario.component.html',
  styleUrl: './perfil-usario.component.css'
})
export class PerfilUsarioComponent {
  imageUrl = 'assets/imagenes/Header/Persona1.jpg'; // Reemplaza con la ruta correcta
  showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
