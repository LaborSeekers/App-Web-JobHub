import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-perfil-usario',
  templateUrl: './perfil-usario.component.html',
  styleUrl: './perfil-usario.component.css'
})
export class PerfilUsarioComponent {
  imageUrl = 'assets/imagenes/Header/Persona1.jpg'; // Reemplaza con la ruta correcta
  showMenu = false;
  rol : string | null = null;
  constructor(loginser :AuthService){
    this.rol = loginser.getRole();
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  closeMenu() {
    this.showMenu = false;
  }
}
