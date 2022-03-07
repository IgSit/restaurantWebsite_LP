import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Dish} from "../dish";
import {BasketService} from "../../../../services/basket.service";
import {Subscription} from "rxjs";
import {User} from "../../../users/user";
import {AuthService} from "../../../../services/auth.service";
import {UsersService} from "../../../../services/users.service";

@Component({
  selector: 'app-dish-order-card',
  templateUrl: './dish-order-card.component.html',
  styleUrls: ['./dish-order-card.component.css']
})
export class DishOrderCardComponent implements OnInit, OnDestroy {
  @Input() dish !: Dish;
  @Input() inBasket : number = 0;
  basketSubscription !: Subscription
  user : User = {
    nick : '',
    email: '',
    roles: ['guest'],
    history: [],
    banned : false
  }
  authSubscription !: Subscription
  usersSubscription !: Subscription


  constructor(private basketService : BasketService, private authService : AuthService, private usersService : UsersService) {
  }

  ngOnInit(): void {
    this.basketSubscription = this.basketService.subject.subscribe((basket : Map<string, number>) => {
      // @ts-ignore
      this.inBasket = (basket.get(this.dish.name) != undefined) ? basket.get(this.dish.name) : 0
    })
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
    this.basketSubscription.unsubscribe()
    this.authSubscription.unsubscribe()
    if (this.usersSubscription != undefined)
      this.usersSubscription.unsubscribe()
  }

  addOneToBasket() {
    this.basketService.updateBasket(this.dish, 1)
  }

  removeOneFromBasket() {
    this.basketService.updateBasket(this.dish, -1)
  }
}
