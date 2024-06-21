import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);

export const selectAccessToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.accessToken
);

export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
);