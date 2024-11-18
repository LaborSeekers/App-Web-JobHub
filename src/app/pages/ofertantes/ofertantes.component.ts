import { AuthService } from './../../core/services/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SubscriptionService } from '../../core/services/subscription.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { MessagingService } from '../../core/services/messaging.service';


@Component({
  selector: 'app-ofertantes',
  templateUrl: './ofertantes.component.html',
  styleUrl: './ofertantes.component.css'
})

export class OfertantesComponent implements OnInit {
  empresaId: number = 0; // Variable para almacenar el id de la empresa
  links = [
    { route: ['inicio'], image: "assets/imagenes/Nav-bar/capas2.png", alt: "capa", id: "capaoverview", text: "Descripción General" },
    { route: ['ofertas-publicadas'], image: "assets/imagenes/Nav-bar/portafolio.png", alt: "portafolio", id: "portafolio-overview", text: "Ofertas publicadas" },
    { route: ['subscripcion'], image: "assets/imagenes/Nav-bar/subscription.png", alt: "image18", id: "marcador-overview", text: "Ver Suscripción" },
    { route: ['ver-empresa/'+this.loginS.getUserInfo().empresa?.id], image: "assets/imagenes/Nav-bar/campanasicon.png", alt: "campana", id: "campana-overview", text: "Ver Empresa" },
    { route: ['/route/path'], image: "assets/imagenes/Nav-bar/Engranajes.png", alt: "config", id: "config-overview", text: "Configuración" },
 
  ];

  selectedIndex: number | null = null;
  newMessages : boolean = false;

  constructor(
    private router: Router,
    private loginS:AuthService,
    private subsS: SubscriptionService,  
    private webSocketService: WebSocketService,
    private messagingService: MessagingService) {}

  ngOnInit() {
    this.getUserEmpresaId();
    this.updateSelectedIndex();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateSelectedIndex());

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

    this.subsS.loadSubscription(this.loginS.getUserInfo().userRoleId);
    this.webSocketService.connect();
  }

  updateSelectedIndex() {
    // Find the index of the link that matches the current route
    this.selectedIndex = this.links.findIndex(link => {
      const routeUrl = this.router.serializeUrl(this.router.createUrlTree(link.route));
      return this.router.url.includes(routeUrl);
    });

    
  }

  getUserEmpresaId() {
    const userInfo = this.loginS.getUserInfo(); 
    if (userInfo && userInfo.empresa) {
      this.empresaId = userInfo.empresa.id;
    }
    //this.loginS.getUserInfo().empresa.id
  }
  selectLink(index: number) {
    this.selectedIndex = index;
  }

}
