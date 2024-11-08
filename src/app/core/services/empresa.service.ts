// src/app/core/services/empresas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/user-info.interface';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
    private apiUrl = `${environment.apiUrl}/admin/Empresas`;

    constructor(private http: HttpClient) {}
  
    getEmpresaById(id: number): Observable<Empresa> {
      return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
    }
    getEmpresaByJobOfferId(jobOfferId: number): Observable<Empresa> {
        return this.http.get<Empresa>(`${this.apiUrl}/${jobOfferId}/empresa`);
      }
}
