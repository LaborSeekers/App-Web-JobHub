import { ApplicationsService } from './../../core/services/applications.service';
import { FavoritesService } from './../../core/services/favorites.service';
import { PostulantesService } from './../../core/services/postulantes.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css']
})
export class PostulantesComponent implements OnInit {
  links = [
    { route: ['TablaOV'], image: "assets/imagenes/Nav-bar/capas2.png", alt: "capa", id: "capaoverview", text: "Descripción General" },
    { route: ['ofertas-laborales'], image: "assets/imagenes/Nav-bar/portafolio.png", alt:"trabajo", id: "ofertas", text: "Ofertas de Trabajo"},
    { route: ['mis-ofertas'], image: "assets/imagenes/Nav-bar/marcador.png", alt: "marcador", id: "marcador-overview", text: "Mis Ofertas" },
    { route: ['AlertasTrabajo'], image: "assets/imagenes/Nav-bar/campanasicon.png", alt: "campana", id: "campana-overview", text: "Alertas de Trabajo" },
    { route: ['appconfiguration'], image: "assets/imagenes/Nav-bar/Engranajes.png", alt: "config", id: "config-overview", text: "Configuración" },
  ];
  selectedIndex: number | null = null;
  isLoading : boolean = true;
  constructor(private router: Router, private loginS:AuthService,
    private FavoritesService: FavoritesService,
    private ApplicationsService: ApplicationsService) {}

  ngOnInit() {
    forkJoin({
      favorites: this.FavoritesService.loadFavoriteJobOffersIds(this.loginS.getUserInfo().userRoleId),
      applied: this.ApplicationsService.loadAppliedJobOffersIds(this.loginS.getUserInfo().userRoleId)
    }).subscribe({
      error: (err) => {
        console.error('Error loading offers:', err);
      },
      complete: () => {
        this.isLoading = false; // Cambiar a false al finalizar la carga
      }
    });

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

  logout(){
    this.loginS.logout();
  }
}
