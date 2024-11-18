import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { ofertalLaboral } from '../models/ofertaLaboral.interface';
import { OfertaLaboralRequest } from '../models/ofertaLaboral-request-interface';
import { OfertanteDTO } from '../models/ofertante-dto.response';
import { ApplicantsByJobOfferReportDTO } from '../models/applicants-by-jobOffer-report.model';

@Injectable({
  providedIn: 'root'
})
export class OfertantesService {
    private apiUrl = `${environment.apiUrl}/admin/joboffer`;
  
    constructor(private http: HttpClient) { }
  
    createJobOffer(ofertaLaboralRequest: OfertaLaboralRequest): Observable<ofertalLaboral> {
      return this.http.post<ofertalLaboral>(this.apiUrl, ofertaLaboralRequest);
    }
  
    getAllJobOffers(): Observable<ofertalLaboral[]> {
      return this.http.get<ofertalLaboral[]>(this.apiUrl);
    }
  
    getJobOffersPage(page: number, size: number, location: string, modality: string, status: string, title: string): Observable<any> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('location', location)
        .set('modality', modality)
        .set('status', status)
        .set('title', title);
  
      return this.http.get<any>(`${this.apiUrl}/page`, { params });
    }
  
    getJobOfferById(jobOfferId: number): Observable<ofertalLaboral> {
      return this.http.get<ofertalLaboral>(`${this.apiUrl}/${jobOfferId}`);
    }
  
    getJobOffersByOffertanteId(
      ofertanteId: number,
      location?: string,
      modality?: number,
      status?: string,
      title?: string,
      page: number = 0,
      size: number = 5
    ): Observable<any> {
      let params = new HttpParams()
        .set('ofertanteid', ofertanteId.toString())
        .set('page', page.toString())
        .set('size', size.toString());

      if (location) {
        params = params.set('location', location);
      }
      if (modality) {
        params = params.set('modality', modality.toString());
      }
      if (status) {
        params = params.set('status', status);
      }
      if (title) {
        params = params.set('title', title);
      }

      return this.http.get<any>(`${this.apiUrl}/pageoffer`, { params });
    }
  
    getReputationJobOfferById(jobOfferId: number): Observable<string> {
      return this.http.get<string>(`${this.apiUrl}/reputation/${jobOfferId}`);
    }
  
    updateJobOffer(id: number, ofertaLaboralRequest: OfertaLaboralRequest): Observable<ofertalLaboral> {
      return this.http.put<ofertalLaboral>(`${this.apiUrl}/${id}`, ofertaLaboralRequest);
    }
  
    deleteJobOffer(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
    getJobOffersByCompanyId(companyId: number): Observable<ofertalLaboral[]> {
      return this.http.get<ofertalLaboral[]>(`${this.apiUrl}/company/${companyId}`);
    }
  
    filterJobOffer(location: string, title: string): Observable<ofertalLaboral[]> {
      const params = new HttpParams()
        .set('location', location)
        .set('title', title);
  
      return this.http.post<ofertalLaboral[]>(`${this.apiUrl}/ofertas/filter`, null, { params });
    }
  
    getPostulantesByJobOfferId(jobOfferId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/${jobOfferId}/postulantes`);
    }
  
    updateJobOfferStatus(jobOfferId: number, status: string): Observable<ofertalLaboral> {
      return this.http.patch<ofertalLaboral>(`${this.apiUrl}/${jobOfferId}/status`, { status });
    }

    getOfertanteById(id: number): Observable<OfertanteDTO> {
      return this.http.get<OfertanteDTO>(`${environment.apiUrl}/auth/Ofertantes/${id}`);
    }


    getJobOffersWithApplicantsCount(ofertanteId: number): Observable<ApplicantsByJobOfferReportDTO[]> {
      const url = `${this.apiUrl}/applicants-count/${ofertanteId}`;
      return this.http.get<ApplicantsByJobOfferReportDTO[]>(url);
    }
  }