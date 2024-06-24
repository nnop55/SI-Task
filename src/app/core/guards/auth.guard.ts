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
    return this.authService.auth$.pipe(
      take(1),
      map((authState: AuthState) => {
        if (authState.accessToken) {
          return true;
        } else {
          return this.router.createUrlTree(['/sign'], { queryParams: { returnUrl: state.url } });
        }
      })
    );
  }

}
