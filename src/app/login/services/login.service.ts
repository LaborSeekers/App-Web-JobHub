import { UserRequest } from './../interfaces/user-request.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { UserResponse } from '../interfaces/user-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = environment.apiUrl;

  //private readonly http = inject(HttpClient);
  constructor(private http: HttpClient) { }

  getUser(): Observable<UserResponse[]> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<UserResponse[]>(url);
  }


  register(newAccount: UserResponse): Observable<UserResponse> {
    const url = `${this.apiUrl}/users`; // Endpoint del backend para registrar cuentas
    return this.http.post<UserResponse>(url, newAccount);
  }


  login(userRequest:UserRequest):Observable<UserResponse>{
    const url =`${this.apiUrl}/login`;
    return this.http.post<UserResponse>(url, userRequest);
  }

  
}
