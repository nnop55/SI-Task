import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthHelperService } from '../services/auth-helper.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private authHelper: AuthHelperService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authHelper.accessToken$.pipe(
      switchMap(token => {

        console.log(token)
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.authHelper.updateUserState(false)

              const refreshToken = localStorage.getItem(AuthService.refreshTokenKey) ?? null;
              if (refreshToken) {

                return this.authService.refreshToken().pipe(
                  switchMap(response => {
                    this.authHelper.updateUserState(true)

                    localStorage.setItem(AuthService.accessTokenKey, response.data.accessToken)
                    if (token) {
                      request = request.clone({
                        setHeaders: {
                          Authorization: `Bearer ${token}`
                        }
                      });
                    }
                    return next.handle(request);
                  })
                )
              }
            }

            return throwError(error);
          })
        );
      })
    )
  }
}
