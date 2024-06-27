import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, IApi, LoginResponse, RegisterRequest, RefreshTokenResponse } from 'src/app/shared/utils/unions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly accessTokenKey = 'TDTM-Access-Token'
  static readonly refreshTokenKey = 'TDTM-Refresh-Token'

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  login(payload: LoginRequest): Observable<IApi<LoginResponse>> {
    return this.http.post<IApi<LoginResponse>>(`${this.baseUrl}/api/auth/login`, payload)
  }

  register(payload: RegisterRequest): Observable<IApi<{}>> {
    return this.http.post<IApi<{}>>(`${this.baseUrl}/api/auth/register`, payload);
  }

  refreshToken(): Observable<IApi<RefreshTokenResponse>> {
    return this.http.post<IApi<RefreshTokenResponse>>(
      `${this.baseUrl}/api/auth/refresh-token`,
      {
        refreshToken:
          localStorage.getItem(AuthService.refreshTokenKey)
      }
    )
  }

  logout(): Observable<IApi<{}>> {
    return this.http.post<IApi<{}>>(`${this.baseUrl}/api/auth/logout`, {})
  }
}
