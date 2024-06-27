import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/auth/auth.state';
import * as AuthActions from '../../store/auth/auth.actions';
import * as AuthSelectors from '../../store/auth/auth.selector';
import { LoginRequest, RegisterRequest } from 'src/app/shared/utils/unions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  isRegistered$: Observable<boolean | undefined>;
  isAuthenticated$: Observable<boolean>
  error$: Observable<string | null>

  constructor(private store: Store<{ auth: AuthState }>) {
    this.isRegistered$ = this.store.select(AuthSelectors.selectIsRegistered);
    this.isAuthenticated$ = this.store.select(AuthSelectors.selectisAuthenticated)
    this.error$ = this.store.select(AuthSelectors.selectisError)
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

  clearError() {
    this.store.dispatch(AuthActions.clearError());
  }
}
