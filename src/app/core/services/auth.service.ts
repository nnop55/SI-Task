import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, IApi, LoginResponse, ResponseStatus, RegisterRequest, RefreshTokenResponse } from 'src/app/shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly accessTokenKey = 'TDTM-Access-Token'
  static readonly refreshTokenKey = 'TDTM-Refresh-Token'

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {

  }

  login(payload: LoginRequest): Observable<IApi<LoginResponse>> {
    return this.http.post<IApi<LoginResponse>>(`${this.baseUrl}/api/auth/login`, payload)
  }

  register(payload: RegisterRequest): Observable<IApi<{}>> {
    return this.http.post<IApi<{}>>(`${this.baseUrl}/api/auth/register`, payload);
  }

  refreshToken(): Observable<IApi<RefreshTokenResponse>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(AuthService.refreshTokenKey)}`
    })

    return this.http.post<IApi<RefreshTokenResponse>>(
      `${this.baseUrl}/api/auth/refresh-token`,
      {},
      { headers }
    );
  }

  logout(): Observable<IApi<{}>> {
    return this.http.post<IApi<{}>>(`${this.baseUrl}/api/auth/logout`, {})
  }
}
