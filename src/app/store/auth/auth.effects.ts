import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { registerFailure, registerSuccess } from './auth.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(action =>
                this.authService.login(
                    action.payload
                ).pipe(
                    map(response => {
                        localStorage.setItem(AuthService.accessTokenKey, response.data.accessToken);
                        localStorage.setItem(AuthService.refreshTokenKey, response.data.refreshToken);
                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                        this.router.navigate([returnUrl]);
                        return AuthActions.loginSuccess(
                            ({
                                code: response.code,
                                data: {
                                    accessToken: response.data.accessToken,
                                    refreshToken: response.data.refreshToken
                                }
                            })
                        )


                    }),
                    catchError(error => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            mergeMap(action =>
                this.authService.register(action.payload).pipe(
                    map(response => {
                        return registerSuccess();
                    }),
                    catchError(error => of(registerFailure({ error })))
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            mergeMap(action =>
                this.authService.logout().pipe(
                    map(response => {
                        localStorage.removeItem(AuthService.accessTokenKey);
                        localStorage.removeItem(AuthService.refreshTokenKey);
                        this.router.navigate(['/']);
                        window.location.reload()
                        return AuthActions.logoutSuccess()
                    })
                )
            )
        )
    );

    refreshToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.refreshToken),
            mergeMap(() =>
                this.authService.refreshToken().pipe(
                    map(response => AuthActions.refreshTokenSuccess(
                        { code: response.code, data: { accessToken: response.data.accessToken } }
                    )
                    ),
                    catchError(error => of(AuthActions.refreshTokenFailure({ error })))
                )
            )
        )
    );
}
