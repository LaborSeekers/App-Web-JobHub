import { environment } from './../../environments/enviroment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ofertalLaboral } from '../models/ofertaLaboral.model';

@Injectable({
  providedIn: 'root'
})
export class PostulantesService {
    private apiUrl = `${environment.apiUrl}/ofertasLaborales`;
    constructor(private http: HttpClient) { }

    getAllOfertasLabo():Observable<ofertalLaboral[]>{
        return this.http.get<ofertalLaboral[]>(this.apiUrl)
    }


  postularOferta(ofertaId: number, userId: number): Observable<any> {
    const url = `${this.apiUrl}/PostularOferta`;  // Esto es correcto
    return this.http.post(url, { userId, ofertaId });
  } 

  getOfertasPostuladas(userId: number): Observable<ofertalLaboral[]> {
    const params = new HttpParams().set('userId', userId.toString()); 
    const url = `${this.apiUrl}/Ofertaspostuladas`;
    return this.http.get<ofertalLaboral[]>(url, { params });
}
    
/*
    createTrip(tripData: Trip):Observable<Trip>{
        return this.http.post<Trip>(this.apiUrl,tripData);
      }
      
      getTripsByDate(date:string): Observable<Trip[]>{
        const url = `${this.apiUrl}/filter-by-date`;
        const params = new HttpParams().set('date',date);
        return this.http.get<Trip[]>(url,{params});
      }
    
      getTripsByRoute(route:string): Observable<Trip[]>{
        const url = `${this.apiUrl}/filter-by-route`;
        const params = new HttpParams().set('route',route);
        return this.http.get<Trip[]>(url,{params});
      }
    
      getStatsbyRoute(): Observable<TripReport[]>{
        const url = `${this.apiUrl}/stats-by-route`;
        return this.http.get<TripReport[]>(url);
      }
    
*/




}