import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.loginSuccess, (state, { data: { accessToken, refreshToken } }) => ({
        ...state,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        error: null
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        isAuthenticated: false,
        error
    })),
    on(AuthActions.register, state => ({
        ...state,
        error: null
    })),
    on(AuthActions.registerSuccess, state => ({
        ...state,
        error: null,
        isRegistered: true
    })),
    on(AuthActions.registerFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(AuthActions.logout, state => ({
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
    })),

);

