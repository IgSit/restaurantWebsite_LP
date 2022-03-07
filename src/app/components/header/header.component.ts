import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";
import {User} from "../users/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user : User = {
    nick : '',
    email: '',
    roles: ['guest'],
    history: [],
    banned : false
  }
  authSubscription !: Subscription
  usersSubscription !: Subscription

  constructor(public authService : AuthService, private usersService : UsersService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.userData.subscribe(user => {
      if (user != null) {
        this.usersSubscription = this.usersService.users.subscribe(obs => {
          this.user = obs.filter((usr: { email: string; }) => usr.email == user.email)[0]
        })
      }
      else {
        this.user = {
          nick : '',
          email: '',
          roles: ['guest'],
          history: [],
          banned : false
        }
        if (this.usersSubscription != undefined)
          this.usersSubscription.unsubscribe()
      }
    })
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe()
    if (this.usersSubscription != undefined)
      this.usersSubscription.unsubscribe()
  }

  is(role : string) : boolean {
    if (this.user == undefined) return false
    return this.user.roles.includes(role)
  }

  signOut() : void {
    this.authService.signOut()
  }

}
