import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, of, switchMap, take} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {UsersService} from "../services/users.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  user ?: any

  constructor(private authService : AuthService, private usersService : UsersService, private router : Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.angularFireAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (user != null) {
          this.user = user
          return this.usersService.database.collection('users').valueChanges().pipe(take(1))
        }
        else{
          this.router.navigate(['']).then();
          return of(null);
        }
      }), map(users => {
        // @ts-ignore
        let usr = users.filter( u => u.email == this.user.email)[0]
        // @ts-ignore
        if (usr.roles.includes('manager') || usr.roles.includes('admin')) {
          return true;
        }
        else {
          this.router.navigate(['']).then();
          return false;
        }
      })
    )}

}
