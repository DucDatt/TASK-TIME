import { Injectable } from '@angular/core';
import { Auth, } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private auth: Auth, private _location: Location) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.user) {
      return true;
    }
    return this.authService.user$.pipe(map((user) => {
      if (user) {
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }
}
