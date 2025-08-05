import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';
import { User } from '../../Models/User.model';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { selectUser } from '../../../store/user.selectors';
import { updateUser } from '../../../store/user.actions';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: Store,
    private userService: UserService,) {}
  
    canActivate(): Observable<boolean> {
      if (isPlatformBrowser(this.platformId)) {
        return this.store.select(selectUser).pipe(
          take(1),
          switchMap((user) => {
            if (user) {
              return of(true);
            }
            const token = localStorage.getItem('token');
            if (token) {
              return this.userService.getUser().pipe(
                map((response) => {
                  if (response) {
                    const userData: User = {
                      id: response.id,
                      email: response.email,
                      firstName: response.firstName,
                      lastName: response.lastName,
                    };
                    this.store.dispatch(updateUser({ user: userData }));
                    return true;
                  }
                  this.router.navigate(['/login']);
                  return false;
                }),
                catchError((error) => {
                  console.error('Error fetching user data:', error);
                  this.router.navigate(['/login']);
                  return of(false);
                })
              );
            } else {
              this.router.navigate(['/login']);
              return of(false);
            }
          })
        );
      }
      return of(false);
    }
    
}
