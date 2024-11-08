import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscription: any = null;
  private subscriptionSubject = new BehaviorSubject<any>(this.subscription);
  private loading : boolean = false;
  private loadingSubject = new BehaviorSubject<boolean>(this.loading);

  
  private apiUrl = `${environment.apiUrl}/subscription`;

  constructor(private http: HttpClient) {}

  getSubscription(ofertanteId: number): Observable<any> {    
    return this.http.get<any>(`${this.apiUrl}/ofertante/${ofertanteId}`).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }

  loadSubscription(ofertanteId: number): void {
    this.loading = true;
    this.loadingSubject.next(this.loading);
    this.getSubscription(ofertanteId).subscribe({
      next: (data) => {
        this.subscription = data;
        this.subscriptionSubject.next(this.subscription);
        this.loading = false;
        this.loadingSubject.next(this.loading);
      },
      error: () => {
        this.subscription = null;
        this.loading = false;
        this.loadingSubject.next(this.loading);
      }
    });
  }

  getSubscriptionObservable(): Observable<any> {
    return this.subscriptionSubject.asObservable(); 
  }
  getLoadingObservable(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
  
  createSubscription(ofertanteID: number, frequency: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/create`, {ofertante:ofertanteID, paymentFrequency: frequency});
  }

  cancelSubscription(subscriptionId: number): Observable<void>{
    return this.http.post<any>(`${this.apiUrl}/cancel/${subscriptionId}`, null);
  }
 
}
