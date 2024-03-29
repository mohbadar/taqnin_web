import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // let isAuth = this.authService.isAuthenticated();
    let isAuth = this.authService.isLoggedIn()
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    else {
      return true;
    }
  }
}
