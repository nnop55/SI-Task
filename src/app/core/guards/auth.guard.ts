import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, debounceTime, map, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthHelperService } from '../services/auth-helper.service';
import { AuthState } from 'src/app/store/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthHelperService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token;

    this.authService.auth$.subscribe((authState: AuthState) => {
      token = authState.refreshToken;
    });

    if (token) {
      return true;
    }

    this.router.navigate(['/sign'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
