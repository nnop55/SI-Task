import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, debounceTime, map, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthHelperService } from '../services/auth-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthHelperService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.accessToken$.pipe(
      map(token => {
        if (token ||
          localStorage.getItem(AuthService.accessTokenKey)
        ) {
          return true;
        }
        this.router.navigate(['/sign'], { queryParams: { returnUrl: state.url } });
        return false;
      })
    );
  }

}
