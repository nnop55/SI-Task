import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/auth/auth.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { LoginRequest, RegisterRequest } from 'src/app/shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  auth$: Observable<AuthState>;


  constructor(private store: Store<{ auth: AuthState }>) {
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
}
