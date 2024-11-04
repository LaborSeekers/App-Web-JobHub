import { environment } from '../../../environments/enviroment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ofertalLaboral } from '../models/ofertaLaboral.interface';
import { AuthService } from '../../core/services/auth.service';
import { Filters } from '../models/filters.interface';
@Injectable({
  providedIn: 'root'
})
export class PostulantesService {
  private apiUrl = `${environment.apiUrl}/admin/joboffer`;
  constructor(private http: HttpClient, private  authService: AuthService) { }

  getAllOfertasLabo():Observable<ofertalLaboral[]>{
      return this.http.get<ofertalLaboral[]>(this.apiUrl);
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
  
  getOfertasRecomendadas(): Observable<ofertalLaboral[]>{
    const params = new HttpParams().set('postulanteId', this.authService.getUserInfo().userRoleId); 
    const url = `${environment.apiUrl}/recomendations`;
    return this.http.get<ofertalLaboral[]>(url, {params});

  }

  getAllOfertasLaboPage(page: number, size: number, location: string, modality: string, status: string, title : string):Observable<any>{
    const params = new HttpParams()
    .set("page", page.toString())
    .set("size", size.toString())
    .set("location", location)
    .set("modality", modality)
    .set("status", status)
    .set("title", title);

    const url = `${this.apiUrl}/page`;
    return this.http.get<any>(url, {params});
  }

  getJobOffersDetailsByIds(page: number, size: number, ids: Array<number>, filter: Filters): Observable<any>{

    if (ids.length === 0) {
      // Retornar un Observable vacío
      return of({ content: [], page: { totalElements: 0, totalPages: 0 } });
    }

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set("location", filter.location)
      .set("modality", filter.modality)
      .set("status", filter.status)
      .set("title", filter.title);

    // Agrega los IDs como parámetros de consulta

    const url = `${this.apiUrl}/details`;
    return this.http.post<any>(url, ids,{ params });
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