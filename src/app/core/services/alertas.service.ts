import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { environment } from '../../../environments/enviroment';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  private feedbacks: any[] = []
  private feedbackSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.feedbacks);
  private newFeedbackSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(
    private AuthService: AuthService,
    private http: HttpClient) {}

    private stompClient: Client | null = null;
  
    connect() {
      const socket = new SockJS(`${environment.apiUrl}/ws`);
      this.stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: { 'X-Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
        debug: (str) => console.log(str),
        reconnectDelay: 5000,
      });
    
      const userId = this.AuthService.getRole() + this.AuthService.getUserInfo().userRoleId;
    
      this.stompClient.onConnect = () => {
        this.stompClient?.subscribe(`/user/${userId}/notifications`, (message) => {
          const feedback = JSON.parse(message.body);
          this.feedbacks.unshift(feedback);
          this.feedbackSubject.next(this.feedbacks);
          this.newFeedbackSubject.next(true);
        });
      };
    
      this.stompClient.activate();
    }

  getFeedbacks() {
    return this.feedbackSubject.asObservable();
  }
  newFeedback(){
    return this.newFeedbackSubject.asObservable();
  }

  private apiFeedbackUrl = `${environment.apiUrl}/feedback`;

  loadAlertas(postulantId: number): Observable<any[]> {
    let params = new HttpParams()
      .set("postulanteId", postulantId)

    return this.http.get<any[]>(`${this.apiFeedbackUrl}/from-postulante`, {params}).pipe(tap((feedback) => {
      this.feedbacks = feedback;
      if(feedback){
        this.feedbackSubject.next(this.feedbacks);
      }
    }))
  }

  enviarFeedback(postulantId: number, ): Observable<any>{ 
    let params = new HttpParams()
    

    return this.http.post<any>(`${this.apiFeedbackUrl}/add`, null, {params});
  }
}
