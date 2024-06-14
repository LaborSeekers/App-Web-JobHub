import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css']
})
export class PostulantesComponent implements OnInit {
  links = [
    { route: ['TablaOV'], image: "assets/imagenes/Nav-bar/capas2.png",selectedImage:"assets/imagenes/Nav-bar/capas.png", alt: "capa", id: "capaoverview", text: "Overview" },
    { route: ['TablaApi'], image: "assets/imagenes/Nav-bar/portafolio.png",selectedImage:"assets/imagenes/Nav-bar/portafolio2.png", alt: "portafolio", id: "portafolio-overview", text: "Trabajos Aplicados" },
    { route: ['TablaFav'], image: "assets/imagenes/Nav-bar/marcador.png",selectedImage:"assets/imagenes/Nav-bar/marcador3.png", alt: "marcador", id: "marcador-overview", text: "Ofertas Favoritas" },
    { route: ['/route/path'], image: "assets/imagenes/Nav-bar/campanasicon.png",selectedImage:"assets/imagenes/Nav-bar/campanasicon2.png", alt: "campana", id: "campana-overview", text: "Alertas de Trabajo" },
    { route: ['appconfiguration'], image: "assets/imagenes/Nav-bar/Engranajes.png",selectedImage:"assets/imagenes/Nav-bar/Engranajes2.png", alt: "config", id: "config-overview", text: "Configuración" },
  ];
  selectedIndex: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize selectedIndex based on the initial route
    this.updateSelectedIndex();

    // Subscribe to route changes to update selectedIndex
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateSelectedIndex());
  }

  updateSelectedIndex() {
    // Find the index of the link that matches the current route
    this.selectedIndex = this.links.findIndex(link => {
      const routeUrl = this.router.serializeUrl(this.router.createUrlTree(link.route));
      return this.router.url.includes(routeUrl);
    });
  }

  selectLink(index: number) {
    this.selectedIndex = index;
  }
}
