import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/auth/auth.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthError } from 'src/app/store/auth/auth.selectors';
import { LoginRequest, RegisterRequest } from 'src/app/shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  error$: Observable<string | null>;
  auth$: Observable<AuthState>;


  constructor(private store: Store<{ auth: AuthState }>) {
    this.error$ = this.store.select(selectAuthError);
    this.auth$ = this.store.select('auth');
  }

  login(payload: LoginRequest) {
    this.store.dispatch(AuthActions.login({ payload }));
  }

  register(payload: RegisterRequest) {
    this.store.dispatch(AuthActions.register({ payload }));
  }

  refreshToken() {
    this.store.dispatch(AuthActions.refreshToken());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  updateUserState(value: boolean) {
    this.store.dispatch(AuthActions.setAuthenticated({ isAuthenticated: value }));
  }
}
