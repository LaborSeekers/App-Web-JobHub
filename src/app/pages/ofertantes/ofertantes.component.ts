import { AuthService } from './../../core/services/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { SubscriptionService } from '../../core/services/subscription.service';


@Component({
  selector: 'app-ofertantes',
  templateUrl: './ofertantes.component.html',
  styleUrl: './ofertantes.component.css'
})

export class OfertantesComponent implements OnInit {
  links = [
    { route: ['inicio'], image: "assets/imagenes/Nav-bar/capas2.png", alt: "capa", id: "capaoverview", text: "Descripción General" },
    { route: ['ofertas-publicadas'], image: "assets/imagenes/Nav-bar/portafolio.png", alt: "portafolio", id: "portafolio-overview", text: "Ofertas publicadas" },
    { route: ['subscripcion'], image: "assets/imagenes/Nav-bar/subscription.png", alt: "image18", id: "marcador-overview", text: "Ver Suscripción" },
    { route: ['/route/path'], image: "assets/imagenes/Nav-bar/Engranajes.png", alt: "config", id: "config-overview", text: "Configuración" },
 
  ];

  selectedIndex: number | null = null;

  constructor(
    private router: Router, 
    private userS:UserService, 
    private loginS:AuthService,
    private subsS: SubscriptionService) {}

  ngOnInit() {
    this.updateSelectedIndex();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateSelectedIndex());

    this.subsS.loadSubscription(this.loginS.getUserInfo().userRoleId);
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
  logout(){
    this.userS.clearUserId();
    this.loginS.logout();
  }

}
