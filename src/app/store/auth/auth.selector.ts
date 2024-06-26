import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.accessToken
)

export const selectRefreshToken = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.refreshToken
)

export const selectIsRegistered = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.isRegistered
)

export const selectisAuthenticated = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.isAuthenticated
)

export const selectisError = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.error
)


