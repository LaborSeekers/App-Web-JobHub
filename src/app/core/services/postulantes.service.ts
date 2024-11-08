import { PostulanteCurriculum } from './../models/postulante-curriculum.interface';
import { environment } from '../../../environments/enviroment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ofertalLaboral } from '../models/ofertaLaboral.interface';
import { AuthService } from '../../core/services/auth.service';
import { Filters } from '../models/filters.interface';
import { LanguageLevel } from '../models/LanguageLevel.interface';
import { EducationLevel } from '../models/EducationLevel.interface';
import { UserInfo } from '../models/user-info.interface';
import { Postulante } from '../models/postulante-dto-response';
@Injectable({
  providedIn: 'root'
})
export class PostulantesService {
  private apiUrl = `${environment.apiUrl}/admin/joboffer`;
  private apiUrl2 =`${environment.apiUrl}/admin`;
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
  // Método para obtener el postulante por ID y adaptarlo a UserInfo
  getPostulanteById(id: number): Observable<Postulante> {
    const url = `${environment.apiUrl}/auth/Postulantes/${id}`; // Asegúrate de usar la URL correcta según tu backend
    return this.http.get<Postulante>(url); // Retorna un Observable de tipo Postulante
  }

  getPostulantesByIds(ids: number[]): Observable<Postulante[]>{
    const url = `${environment.apiUrl}/auth/Postulantes/get`; 
    return this.http.post<Postulante[]>(url, ids);
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

  
getCurriculum(userId: number): Observable<PostulanteCurriculum> {
  return this.http.get<PostulanteCurriculum>(`${this.apiUrl2}/curriculums/${userId}`);
}
createCurriculum(cv: PostulanteCurriculum): Observable<PostulanteCurriculum> {
  return this.http.post<PostulanteCurriculum>(`${this.apiUrl2}/curriculums`, cv);
}
updateCurriculum(cv: PostulanteCurriculum): Observable<PostulanteCurriculum> {
  return this.http.put<PostulanteCurriculum>(`${this.apiUrl2}/curriculums/${cv.id}`, cv);
}

getLanguageLevels():Observable<LanguageLevel[]>{
  return this.http.get<LanguageLevel[]>(`${this.apiUrl2}/language_level`);
}
getEducationLevels():Observable<EducationLevel[]>{
  return this.http.get<EducationLevel[]>(`${this.apiUrl2}/education_level`);
}


}