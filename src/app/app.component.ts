import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { AuthState } from './store/auth/auth.state';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'si-task';

  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
    const accessToken = localStorage.getItem(AuthService.accessTokenKey)
    const refreshToken = localStorage.getItem(AuthService.refreshTokenKey)
    if (accessToken && refreshToken) {
      this.store.dispatch(AuthActions.loginSuccess({ code: 1, data: { accessToken, refreshToken } }));
    }
  }
}
