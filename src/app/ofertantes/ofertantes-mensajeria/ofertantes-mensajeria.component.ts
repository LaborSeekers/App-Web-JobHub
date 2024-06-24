import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-ofertantes-mensajeria',
  templateUrl: './ofertantes-mensajeria.component.html',
  styleUrl: './ofertantes-mensajeria.component.css'
})
export class OfertantesMensajeriaComponent  implements OnInit {
  
  links = [
    { route: ['TablaOV'], image: "assets/imagenes/Nav-bar/capas2.png",selectedImage:"assets/imagenes/Nav-bar/capas.png", alt: "capa", id: "capaoverview", text: "Overview" },
    { route: ['ofertas-publicadas'], image: "assets/imagenes/Nav-bar/portafolio.png",selectedImage:"assets/imagenes/Nav-bar/portafolio2.png", alt: "portafolio", id: "portafolio-overview", text: "Ofertas publicadas" },
    { route: ['TablaFav'], image: "assets/imagenes/Nav-bar/image18.png",selectedImage:"assets/imagenes/Nav-bar/image18.png", alt: "image18", id: "marcador-overview", text: "Ver Postulantes" },
    { route: ['/route/path'], image: "assets/imagenes/Nav-bar/campanasicon.png",selectedImage:"assets/imagenes/Nav-bar/campanasicon2.png", alt: "campana", id: "campana-overview", text: "Notificaciones" },
    { route: ['/route/path'], image: "assets/imagenes/Nav-bar/Engranajes.png",selectedImage:"assets/imagenes/Nav-bar/Engranajes2.png", alt: "config", id: "config-overview", text: "Configuración" },
 
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
