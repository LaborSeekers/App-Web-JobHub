import { MessagingService } from './../../core/services/messaging.service';
import { AlertasService } from './../../core/services/alertas.service';
import { ApplicationsService } from './../../core/services/applications.service';
import { FavoritesService } from './../../core/services/favorites.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { forkJoin, Subscription } from 'rxjs';
import { WebSocketService } from '../../core/services/websocket.service';

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
    { route: ['AlertasTrabajo'], image: "assets/imagenes/Nav-bar/campanasicon.png", alt: "campana", id: "alertas", text: "Alertas de Trabajo", badge: -1},
    { route: ['appconfiguration'], image: "assets/imagenes/Nav-bar/Engranajes.png", alt: "config", id: "config-overview", text: "Configuración" },
  ];
  selectedIndex: number | null = null;
  isLoading : boolean = false;
  newMessages : boolean = false;

  constructor(private router: Router, private loginS:AuthService,
    private FavoritesService: FavoritesService,
    private ApplicationsService: ApplicationsService,
    private AlertasService: AlertasService,
    private webSocketService: WebSocketService,
    private messagingService: MessagingService) {}


  private alertSubscription: Subscription = new Subscription;
  ngOnInit() {
    forkJoin({
      favorites: this.FavoritesService.loadFavoriteJobOffersIds(this.loginS.getUserInfo().userRoleId),
      applied: this.ApplicationsService.loadAppliedJobOffersIds(this.loginS.getUserInfo().userRoleId),
      alerts: this.AlertasService.loadAlertas(this.loginS.getUserInfo().userRoleId)
    }).subscribe({
      error: (err) => {
      },
      complete: () => {
        this.isLoading = false; // Cambiar a false al finalizar la carga
      }
    });
    
    this.messagingService.getConversations().subscribe(conversations =>{
      this.newMessages = conversations.some(conversation => {
        const lastMessage = conversation.lastMessage;
        if(lastMessage){
          return lastMessage && lastMessage.sender !== this.loginS.getUserInfo().id && !lastMessage.read;
        }
      });
    })

    this.messagingService.getChatMessages().subscribe(message => {
      if(message){
        this.newMessages = message && message.sender !== this.loginS.getUserInfo().id && !message.isRead;
      }
    })

    this.messagingService.getUpdates().subscribe(()=>{
      this.newMessages = false;
    })

    this.webSocketService.connect();
    this.AlertasService.newFeedback().subscribe(()=>{
      this.addAlert();
    })


    this.updateSelectedIndex();
    // Subscribe to route changes to update selectedIndex
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateSelectedIndex());
  }


  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

  addAlert(){
    const alertLink = this.links.find(link => link.id === 'alertas');
      if (alertLink) {
        alertLink.badge! += 1;
      }
  }

  updateSelectedIndex() {
    this.selectedIndex = this.links.findIndex(link => {
      const routeUrl = this.router.serializeUrl(this.router.createUrlTree(link.route));
      if(link.id === 'alertas'){
        link.badge = 0;
      }
      return this.router.url.includes(routeUrl);
    });
  }

  selectLink(index: number) {
    this.selectedIndex = index;
  }
}
