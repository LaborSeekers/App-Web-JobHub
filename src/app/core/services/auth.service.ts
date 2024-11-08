import { UserRequest } from '../models/user-request.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { UserResponse } from '../models/user-response.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { UserRegistrationDTO } from '../models/user-registration-request.interface';
import { Empresa, UserInfo } from '../models/user-info.interface';
import { ofertalLaboral } from '../models/ofertaLaboral.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;

  private tokenKey = 'auth_token';

  private readonly http = inject(HttpClient);
  private router = inject(Router);



  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {return localStorage.getItem(this.tokenKey);}

  getRole(): string | null { 
    try{
      return this.getUserInfo().role;
    }
    catch{
      if(environment.producction==false){console.log("Rol nulo");}      
      return null;
    }
  }

  getUserInfo(): UserInfo{
    const storedInfo = localStorage.getItem("UserInfo");    
    return storedInfo ? JSON.parse(storedInfo) : null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('UserInfo');
    this.router.navigate(['']); // Redirige a la página de login
  }

  private redirectByRole(role: string): void {
    switch(role){
      case "ADMIN":
        this.router.navigate(['/Postulantes']); // falta /Admin
        break;
      case "POSTULANTE":
        this.router.navigate(['/Postulantes']);
        break;
      case "OFERTANTE":
        this.router.navigate(['/Ofertantes']);
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
    // Del auth token ya se encarga el interceptor
    return this.http.post<UserRegistrationDTO>(url, newAccount);
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
    return this.http.post<UserResponse>(url, userRequest , { withCredentials: true }).pipe(
      tap(response => {
        // Almacena el token en el localStorage
        this.setToken(response.token);

        // Verifica si el token está presente
        const token = localStorage.getItem('authToken');
        if (token) {
          this.getUserbyEmail(userRequest.email).subscribe({
            next: (userProfileDTO: UserInfo) => {
              userProfileDTO.role = response.role;
              localStorage.setItem("UserInfo", JSON.stringify(userProfileDTO));
  
              this.redirectByRole(response.role);  // Redirige según el rol
            }
          });
        } else {
          console.error('El token no se guardó correctamente');
        }
      })
    );
  }

  forgotPassword(email: string): Observable<string> {
    const token = localStorage.getItem(this.tokenKey);
    const url = `${this.apiUrl}/auth/regenerate-otp`; // Endpoint del backend
    const params = new HttpParams().set('email', email);
  
    // Crear los encabezados con el token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Asegúrate de que el token esté presente
    });
  
    // Hacer la solicitud PUT con los encabezados y los parámetros, y especificar el tipo de respuesta como texto
    return this.http.put<string>(url, null, { params, headers, responseType: 'text' as 'json' })
  }
  
  verifyOtp(email: string, otp: string): Observable<string> {
    const token = localStorage.getItem(this.tokenKey);
    const url = `${this.apiUrl}/auth/verify-account`;  // Endpoint para verificar el OTP
    const params = new HttpParams()
      .set('email', email)
      .set('otp', otp);

    // Crear los encabezados con el token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Asegúrate de que el token esté presente
    });

    return this.http.put<string>(url, null, { params, headers, responseType: 'text' as 'json' });
  }
}
