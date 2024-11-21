import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  links = [
    { route: ['register-emp'], image: "assets/imagenes/Nav-bar/capas2.png", alt: "capa", id: "capaoverview", text: "Registrar Empresas" },
    { route: ['register-user'], image: "assets/imagenes/Nav-bar/portafolio.png", alt:"trabajo", id: "ofertas", text: "Registrar Usuario"},
  ];

  constructor(
    private router: Router,){
  }


  selectedIndex: number | null = null;

  isLoading = false;

  updateSelectedIndex() {
    this.selectedIndex = this.links.findIndex(link => {
      const routeUrl = this.router.serializeUrl(this.router.createUrlTree(link.route));
      return this.router.url.includes(routeUrl);
    });
  }
}
