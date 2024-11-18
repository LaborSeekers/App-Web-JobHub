import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private appliedJobs: Array<number> = new Array();
  private appliedSubject = new BehaviorSubject<Array<number>>(this.appliedJobs);
  private applicationsIds: Array<number> = new Array();
  private applicationsIdsSubject = new BehaviorSubject<Array<number>>(this.applicationsIds);

  constructor(private http: HttpClient,
    private AuthService:AuthService
  ) { 
    this.AuthService.getLogoutSignal().subscribe((signal)=>{
      if(signal){
        this.clearApplicationsData();
      }
    })
  }

  private apiAppliedUrl = `${environment.apiUrl}/applications`;

  addApplied(id: number, jobId: number){
    this.appliedJobs.unshift(jobId);
    this.applicationsIds.unshift(id);
    this.appliedSubject.next(this.appliedJobs);
    this.applicationsIdsSubject.next(this.applicationsIds);
  }
  removeApplied(id: number) {
    const indexToRemove = this.appliedJobs.indexOf(id);
    this.appliedJobs.splice(indexToRemove, 1);
    this.applicationsIds.splice(indexToRemove, 1);
    this.appliedSubject.next(this.appliedJobs);
    this.applicationsIdsSubject.next(this.applicationsIds);
  }
  
  addAppliedJobOffer(jobOfferId:number, postulanteId:number) : Observable<any>{
    const url = `${this.apiAppliedUrl}/create`;
    return this.http.post<any>(url, {postulante_id:postulanteId, jobOffer_id:jobOfferId},);
  }

  removeAppliedJobOffer(jobOfferId:number, postulanteId:number) : Observable<any>{
    let params = new HttpParams()
      .set("postId", postulanteId)
      .set("jobId", jobOfferId);

    const url = `${this.apiAppliedUrl}/delete`;
    return this.http.delete<any>(url, {params});
  }

  loadAppliedJobOffersIds(postulantId: number): Observable<any[]> {
    let params = new HttpParams()
      .set("id", postulantId);
    return this.http.get<any[]>(`${this.apiAppliedUrl}/by-postulant`, {params}).pipe(
      tap((applications) => {
        applications.forEach(application => {
          this.appliedJobs.push(application.jobOffer_id);
          this.applicationsIds.push(application.id);
        });
        if(applications){
          this.appliedSubject.next(this.appliedJobs);
          this.applicationsIdsSubject.next(this.applicationsIds);
        }
      })
    );
  }

  getAppliedIds(){
    return this.appliedSubject.asObservable();
  }


  loadApplicationsByJobId(jobId: number): Observable<any[]> {
    let params = new HttpParams().set("id", jobId);
    const url = `${this.apiAppliedUrl}/by-job`;
    return this.http.get<any[]>(url, { params });
  }

  clearApplicationsData(): void {
    this.appliedJobs = [];
    this.applicationsIds = [];
    this.appliedSubject.next(this.appliedJobs);
    this.applicationsIdsSubject.next(this.applicationsIds);
  }
}
