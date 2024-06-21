import { createAction, props } from '@ngrx/store';
import { IApi, LoginRequest, LoginResponse, RefreshTokenResponse, RegisterRequest } from 'src/app/shared/utils/unions';


export const LOGIN = '[Auth] Login'
export const LOGIN_SUCCESS = '[Auth] Login Success'
export const LOGIN_FAILURE = '[Auth] Login Failure'
export const REGISTER = '[Auth] Register'
export const REGISTER_SUCCESS = '[Auth] Register Success'
export const REGISTER_FAILURE = '[Auth] Register Failure'
export const REFRESH_TOKEN = '[Auth] Refresh Token'
export const REFRESH_TOKEN_SUCCESS = '[Auth] Refresh Token Success'
export const REFRESH_TOKEN_FAILURE = '[Auth] Refresh Token Failure'
export const LOGOUT = '[Auth] Logout'
export const LOGOUT_SUCCESS = '[Auth] Logout Success'
export const SET_AUTHENTICATED = '[Auth] Set Authenticated'




export const login = createAction(LOGIN, props<{ payload: LoginRequest }>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<IApi<LoginResponse>>());
export const loginFailure = createAction(LOGIN_FAILURE, props<{ error: string }>());

export const register = createAction(REGISTER, props<{ payload: RegisterRequest }>());
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE, props<{ error: string }>());

export const refreshToken = createAction(REFRESH_TOKEN);
export const refreshTokenSuccess = createAction(REFRESH_TOKEN_SUCCESS, props<IApi<RefreshTokenResponse>>());
export const refreshTokenFailure = createAction(REFRESH_TOKEN_FAILURE, props<{ error: string }>());

export const logout = createAction(LOGOUT);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const setAuthenticated = createAction(SET_AUTHENTICATED, props<{ isAuthenticated: boolean }>());
