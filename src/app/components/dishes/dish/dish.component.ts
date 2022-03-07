import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Dish } from './dish'
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {UsersService} from "../../../services/users.service";
import {Subscription} from "rxjs";
import {User} from "../../users/user";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit, OnDestroy {
  @Input() dish !: Dish
  @Input() hasMaxPrice !: boolean;
  @Input() hasMinPrice !: boolean;
  @Output() deleteDishEmitter = new EventEmitter<Dish>();
  authSubscription !: Subscription
  usersSubscription !: Subscription
  user : User = {
    nick : '',
    email: '',
    roles: ['guest'],
    history: [],
    banned : false
  }


  constructor(private router : Router, private authService : AuthService, private usersService : UsersService) { }

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
    if (this.usersSubscription != undefined)
      this.usersSubscription.unsubscribe()
  }

  deleteDish() : void {
    this.deleteDishEmitter.emit(this.dish);
  }

  hasRoute(route : string) : boolean {
    return this.router.url == route
  }

  style() : Object {
    if (this.user.roles.includes('guest') && this.hasMaxPrice) return {'border' : '4px solid red', 'max-height' : '600px'}
    if (this.user.roles.includes('guest') && this.hasMinPrice) return {'border' : '4px solid green', 'max-height' : '600px'}
    if (this.hasMaxPrice) return {'border' : '4px solid red'}
    if (this.hasMinPrice) return {'border' : '4px solid green'}
    if (this.user.roles.includes('guest'))
      return {'max-height' : '600px'}
    return {}
  }
}
