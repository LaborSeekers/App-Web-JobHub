  import { AuthService } from './auth.service';
  import { HttpClient, HttpParams } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { environment } from '../../../environments/enviroment';
  import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
  import { WebSocketService } from './websocket.service';

  @Injectable({
    providedIn: 'root'
  })
  export class AlertasService {
    private feedbacks: any[] = []
    private feedbackSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.feedbacks);
    private newFeedbackSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(
      private AuthService: AuthService,
      private http: HttpClient,
      private webSocketService: WebSocketService
    ) {
      this.webSocketService.getConnectionStatus().subscribe(isConnected => {
        if (isConnected) {
          this.subscribeToFeedbacks();
        }
      });
      this.AuthService.getLogoutSignal().subscribe((signal)=>{
        if(signal){
          this.clearAlertasData();
        }
      })
    }
    
    subscribeToFeedbacks() {  
      const userId = this.AuthService.getRole() + this.AuthService.getUserInfo().userRoleId;
      const channel = `/user/${userId}/notifications`;
    
      this.webSocketService.subscribe(channel, (message:any) => {
        const feedback = JSON.parse(message.body);
        this.feedbacks.unshift(feedback);
        this.feedbackSubject.next(this.feedbacks);
        this.newFeedbackSubject.next(true);      
      });
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

    enviarFeedback(applicationId: number, content:string): Observable<any>{
      let params = new HttpParams()      
      .set("applicationId", applicationId)
      .set("content", content);

      return this.http.post<any>(`${this.apiFeedbackUrl}/add`, null, {params});
    }

    clearAlertasData(): void {
      this.feedbacks = [];
      this.feedbackSubject.next(this.feedbacks);
      this.newFeedbackSubject.next(false);
    }
  }
