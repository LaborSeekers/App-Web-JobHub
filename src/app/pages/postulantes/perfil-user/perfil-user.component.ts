import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.css'
})
export class PerfilUserComponent {
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
