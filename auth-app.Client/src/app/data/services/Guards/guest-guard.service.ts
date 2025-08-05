import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GuestGuardService implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}
  canActivate() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token') == null) return true;
      else {
        this.router.navigate(['/']);
        return false;
      }
    }
    return false;
  }
}
