import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/auth/auth.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAccessToken, selectAuthError, selectIsAuthenticated } from 'src/app/store/auth/auth.selectors';
import { LoginRequest, RegisterRequest } from 'src/app/shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  isAuthenticated$: Observable<boolean>;
  accessToken$: Observable<string | null>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.accessToken$ = this.store.select(selectAccessToken);
    this.error$ = this.store.select(selectAuthError);
  }

  login(payload: LoginRequest) {
    this.store.dispatch(AuthActions.login({ payload }));
  }

  register(payload: RegisterRequest) {
    this.store.dispatch(AuthActions.register({ payload }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  updateUserState(value: boolean) {
    this.store.dispatch(AuthActions.setAuthenticated({ isAuthenticated: value }));
  }
}
