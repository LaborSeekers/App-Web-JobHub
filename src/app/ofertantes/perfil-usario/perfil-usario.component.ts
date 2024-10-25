import { Component } from '@angular/core';
import { LoginService } from '../../login/services/login.service';

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
  rol : string | null = null;
  constructor(loginser :LoginService){
    this.rol = loginser.getRole();
  }
}
