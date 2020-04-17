import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(public tokenStorageService: TokenStorageService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.tokenStorageService.isLogged()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
