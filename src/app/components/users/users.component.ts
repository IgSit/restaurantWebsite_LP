import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "./user";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users !: User[]
  usersSubscription !: Subscription

  constructor(private usersService : UsersService, public authService : AuthService) {}

  ngOnInit(): void {
    this.usersSubscription = this.usersService.users.subscribe(users => {
      this.users = users
    })
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe()
  }

  changePersistence(persistence : string): void {
    this.authService.setPersistence(persistence)
  }

  handleBan(user : User) : void {
    user.banned = !user.banned
    this.usersService.updateUser(user)
  }

  handleRole(user : User, role : string) : void {
    if (user.roles.includes(role)) user.roles.splice(user.roles.indexOf(role), 1)
    else user.roles.push(role)
    this.usersService.updateUser(user)
  }

  is(user : User, role : string) : boolean {
    if (user == undefined) return false
    return user.roles.includes(role)
  }

}
