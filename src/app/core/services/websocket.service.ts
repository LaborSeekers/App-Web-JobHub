import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/enviroment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client | null = null;
  private isConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private shouldReconnect: boolean = true;
  private reconnectDelay: number = 5000;

  constructor(
    private AuthService:AuthService
  ) {
    this.AuthService.getLogoutSignal().subscribe((signal)=>{
      if(signal){
        this.shouldReconnect = false; 
        this.clearWebSocketData();
      }
    })
  }

  connect(reconect:boolean = true): void {
    const socket = new SockJS(`${environment.apiUrl}/ws`);

    if(reconect){
      this.shouldReconnect = reconect;
    }

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { 'X-Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
      onConnect: () => {
        this.isConnectedSubject.next(true);
      },
      onDisconnect: () => {
        this.isConnectedSubject.next(false);
      }
    });

    this.stompClient.activate();

    this.stompClient.onWebSocketClose = () => {
      if (this.shouldReconnect) {
        setTimeout(() => {
          this.connect(this.shouldReconnect);
        }, this.reconnectDelay);
      }
    };
  }

  sendMessage(destination: string, message: any): void {
    if (this.stompClient && this.isConnectedSubject.getValue()) {
      this.stompClient.publish({
        destination,
        body: JSON.stringify(message),
      });
    }
  }

  getConnectionStatus() {
    return this.isConnectedSubject.asObservable();
  }

  subscribe(channel: string, callback: (message: Message) => void): void {
    if (this.stompClient) {
      this.stompClient.subscribe(channel, callback);
    }
  }

  clearWebSocketData(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
    }
    this.isConnectedSubject.next(false);
  }
}