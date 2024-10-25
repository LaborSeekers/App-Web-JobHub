import { UserRequest } from './../interfaces/user-request.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { UserResponse } from '../interfaces/user-response.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { UserRegistrationDTO } from '../interfaces/userRegistrationDTO';
import { Empresa, UserInfo } from '../interfaces/userInfo';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = environment.apiUrl;
  private tokenKey = 'auth_token';
  //private readonly http = inject(HttpClient);
  constructor(private http: HttpClient, private router: Router) { }


  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['']); // Redirige a la página de login
  }

  private redirectByRole(role: string): void {
    if (role === 'ADMIN') {
      this.router.navigate(['/Postulantes']);//por definir /admin
    } else if (role === 'POSTULANTE') {
      this.router.navigate(['/Postulantes']);
      
    }else if (role === 'OFERTANTE') {
      this.router.navigate(['/Ofertantes']);
    }else {
      this.router.navigate(['']);
    }
  }

  getUserbyEmail(email: string): Observable<UserInfo> {
    const url = `${this.apiUrl}/user/profile/email/${email}`; // Usar path variable
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, 
    });

    return this.http.get<UserInfo>(url, { headers });
}

  registerPostulante(newAccount: UserRegistrationDTO): Observable<UserRegistrationDTO> {
    const url = `${this.apiUrl}/auth/register/Postulantes`; // Endpoint del backend para registrar cuentas
    return this.http.post<UserRegistrationDTO>(url, newAccount);
  }
  registerOfertante(newAccount: UserRegistrationDTO): Observable<UserRegistrationDTO> {
    const url = `${this.apiUrl}/auth/register/Ofertantes`; // Endpoint del backend para registrar cuentas
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, 
    });
    return this.http.post<UserRegistrationDTO>(url, newAccount, { headers });
  }

  getEmpresa(): Observable<Empresa[]> {
    const url = `${this.apiUrl}/admin/Empresas`; 
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, 
    });
    return this.http.get<Empresa[]>(url, { headers });
  }

  login(userRequest:UserRequest):Observable<UserResponse>{
    const url =`${this.apiUrl}/auth/login`;
    return this.http.post<UserResponse>(url, userRequest).pipe(
      tap(response => {
        // Almacena el token en el localStorage
        this.setToken(response.token);
        // Guarda los detalles del usuario (opcional)
        localStorage.setItem('userName', response.name);
        localStorage.setItem('userRole', response.role);
        // Redirige según el rol del usuario
        this.redirectByRole(response.role);
      })
    );
  }
  
  
}
