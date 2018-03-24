import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class SecurityGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private route: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.authService.isAuthenticated()) return true;
        this.route.navigate(['/auth','login'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
    }
}