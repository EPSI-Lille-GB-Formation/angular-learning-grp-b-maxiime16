// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShareService } from '../services/share.service';
@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(private sharedService: ShareService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.sharedService.isLoggedIn) {
      return true; // L'utilisateur est connecté, autorisez la navigation
    } else {
      // L'utilisateur n'est pas connecté, redirigez vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}