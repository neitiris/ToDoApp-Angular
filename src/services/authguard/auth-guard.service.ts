import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {
  }

  // Checking of key in storage
  canActivate(): boolean {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

