import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {DishesService} from "../../services/dishes.service";
import {Dish} from "../dishes/dish/dish";
import {CurrencyChangerService} from "../../services/currency-changer.service";
import {Subscription} from "rxjs";
import {User} from "../users/user";
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {
  basket : Map<string, number> = new Map<string, number>()
  dishes : Dish[] = []
  basketValue !: number
  dishesSubscription !: Subscription
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

  constructor(private basketService : BasketService, private dishesService : DishesService,
              public currencyChangerService : CurrencyChangerService, private authService : AuthService,
              private usersService : UsersService) {
  }

  ngOnInit(): void {
    this.basket = this.basketService.basket
    this.dishes = this.dishesService.dishes
    this.basketValue = 0
    for (let [key, value] of this.basket) {
      this.basketValue += this.toDish(key).price * value
    }

    this.dishesSubscription = this.dishesService.getDishes().subscribe((dishes : Dish[]) => {
      this.dishes = dishes
    })
    this.basketSubscription = this.basketService.subject.subscribe((basket : Map<string, number>) => {
      this.basket = basket
      this.basketValue = 0
      for (let [key, value] of basket) {
        this.basketValue += this.toDish(key).price * value
      }
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
    this.dishesSubscription.unsubscribe()
    this.basketSubscription.unsubscribe()
    this.authSubscription.unsubscribe()
    if (this.usersSubscription != undefined)
      this.usersSubscription.unsubscribe()
  }

  toDish(name : string) : Dish {
    let tmp : Dish[] = this.dishes.filter(d => d.name == name)
    return tmp[0]
  }

  buy() : void {
    for (let [key, value] of this.basket) {
      let dish : Dish = this.toDish(key)
      dish.maxPerDay -= value
      this.dishesService.updateDish(dish)
      // @ts-ignore
      this.user.history.push({name : dish.name, rated : false, starRated : false})
    }
    this.usersService.updateUser(this.user)
    this.basket.clear()
    this.basketValue = 0
  }

}
