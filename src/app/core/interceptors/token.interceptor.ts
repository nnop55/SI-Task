import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private token!: string;

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(this.addAuthToken(req)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (req.url.includes('refresh-token')) {
            localStorage.removeItem(AuthService.refreshTokenKey);
            window.location.reload();
            return throwError(error);
          }
          localStorage.removeItem(AuthService.accessTokenKey);
          return this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addAuthToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.token || localStorage.getItem(AuthService.accessTokenKey);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.refreshToken().pipe(
        switchMap((res) => {
          this.isRefreshing = false;
          localStorage.setItem(AuthService.accessTokenKey, res.data.accessToken)
          this.token = res.data.accessToken
          return next.handle(this.addAuthToken(request));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          return throwError((err))
        })
      );
    }
    return next.handle(request)
  }
}
