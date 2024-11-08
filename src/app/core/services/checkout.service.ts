import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) {}

  private apiCheckoutUrl = `${environment.apiUrl}/checkout`;

  createOrder(subscriptionId: number): Observable<any>{

    const returnUrl = window.location.origin + '/Ofertantes/hub/subscripcion/check';
    const cancelUrl = window.location.origin + '/Ofertantes/hub/subscripcion';
    const params = new HttpParams()
    .set("subscriptionId", subscriptionId)
    .set("returnUrl", returnUrl)
    .set("cancelUrl", cancelUrl)

    return this.http.post(`${this.apiCheckoutUrl}/create`, null, {params})
  }

  captureOrder(orderId: string): Observable<any>{
    const params = new HttpParams()
    .set("orderId", orderId)
    return this.http.post(`${this.apiCheckoutUrl}/capture`, null, {params})
  }
}
