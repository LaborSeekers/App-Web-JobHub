import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {  
  private favorites: Array<number> = new Array();
  private favoritesSubject = new BehaviorSubject<Array<number>>(this.favorites);

  constructor(private http: HttpClient, 
    private AuthService:AuthService
  ) {
    this.AuthService.getLogoutSignal().subscribe((signal)=>{
      if(signal){
        this.clearFavoritesData();
      }
    })
  }

  private apiFavUrl = `${environment.apiUrl}/admin/fav-job-offers`;

  addFavorite(id: number){
    this.favorites.unshift(id);
    this.favoritesSubject.next(this.favorites)
  }
  removeFavorite(id: number) {
    const indexToRemove = this.favorites.indexOf(id);
    this.favorites.splice(indexToRemove, 1);
    this.favoritesSubject.next(this.favorites)
  }
  addFavoriteJobOffer(jobOfferId:number, postulanteId:number) : Observable<any>{
    const url = `${this.apiFavUrl}/postulants/${postulanteId}/job-offers?job_offer_id=${jobOfferId}`;
    return this.http.post<any>(url, null);
  }

  removeFavoriteJobOffer(jobOfferId:number, postulanteId:number) : Observable<any>{
    const url = `${this.apiFavUrl}/postulants/${postulanteId}/job-offers/${jobOfferId}`;
    return this.http.delete<any>(url);
  }

  loadFavoriteJobOffersIds(postulantId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiFavUrl}/postulants/${postulantId}`).pipe(
      tap((favorites) => {
        favorites.forEach(favorite => this.favorites.push(favorite.jobOffer_id));
        if(favorites){
          this.favoritesSubject.next(this.favorites)
        }
      })
    );
  }

  getFavoritesIds(){
    return this.favoritesSubject.asObservable();
  }

  clearFavoritesData(): void {
    this.favorites = [];
    this.favoritesSubject.next(this.favorites);
  }
}
