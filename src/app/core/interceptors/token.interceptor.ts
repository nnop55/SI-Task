import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthHelperService } from '../services/auth-helper.service';
import { AuthState } from 'src/app/store/auth/auth.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authHelper: AuthHelperService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(this.addAuthToken(req)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (req.url.includes('refresh-token')) {
            localStorage.removeItem(AuthService.refreshTokenKey);
            window.location.reload()
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
    let token: string | null = null;
    this.authHelper.auth$.pipe(take(1)).subscribe((authState: AuthState) => {
      token = authState.accessToken;
    });

    if (token) {
      return request.clone({
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

      let refreshToken: string | null = null;
      this.authHelper.auth$.pipe(take(1)).subscribe((authState: AuthState) => {
        refreshToken = authState.refreshToken;
      });

      if (refreshToken) {
        this.authHelper.refreshToken();
        this.isRefreshing = false;
      }
    }

    return next.handle(this.addAuthToken(request))
  }

}
