import {Component, OnDestroy, OnInit} from '@angular/core';
import {DishesService} from "../../services/dishes.service";
import {ActivatedRoute} from "@angular/router";
import {Dish} from "../dishes/dish/dish";
import {BasketService} from "../../services/basket.service";
import {Subscription} from "rxjs";
import {Rate} from "./dish-review/rate";
import {User} from "../users/user";
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-single-dish',
  templateUrl: './single-dish.component.html',
  styleUrls: ['./single-dish.component.css']
})
export class SingleDishComponent implements OnInit, OnDestroy {
  key !: string;
  dish !: Dish;
  inBasket : number = 0
  dishesSubscription !: Subscription
  basketSubscription !: Subscription
  basket !: Map<string, number>
  user : User = {
    nick : '',
    email: '',
    roles: ['guest'],
    history: [],
    banned : false
  }
  authSubscription !: Subscription
  usersSubscription !: Subscription
  canStarRate !: boolean

  constructor(private dishesService : DishesService, private route : ActivatedRoute,
              private basketService : BasketService, private authService : AuthService,
              private usersService : UsersService) {

  }

  ngOnInit(): void {
    this.key = this.route.snapshot.params['key'];
    this.basket = this.basketService.basket
    this.dishesSubscription = this.dishesService.getDishes().subscribe((dishes : Dish[]) => {
      dishes = dishes.filter((d : Dish) => (d.key == this.key))
      this.dish = dishes[0]
    });
    this.basketSubscription = this.basketService.subject.subscribe((basket : Map<string, number>) => {
      this.basket = basket
      // @ts-ignore
      this.inBasket = (this.basket.get(this.dish.name) != undefined) ? this.basket.get(this.dish.name) : 0
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

  ngOnDestroy() : void {
    this.dishesSubscription.unsubscribe()
    this.basketSubscription.unsubscribe()
    this.authSubscription.unsubscribe()
    if (this.usersSubscription != undefined)
      this.usersSubscription.unsubscribe()
  }

  addReview(rate : Rate) {
    this.dish.reviews.push(rate)
    this.user.history.filter(entry => entry.name == this.dish.name).forEach(order => order.rated = true)
    this.usersService.updateUser(this.user)
    this.dishesService.updateDish(this.dish)
  }

  orderedDish() : boolean {
    return this.user.history.filter(order => order.name == this.dish.name).length > 0
  }

  addedReview() :boolean {
    return this.user.history.filter(order => order.name == this.dish.name).map(entry => entry.rated).includes(true)
  }

  canRate() : boolean {
    if (this.user.roles.includes('manager')) return false
    this.canStarRate = !this.user.history.filter(order => order.name == this.dish.name).map(entry => entry.starRated).includes(true)
    this.canStarRate = this.canStarRate && !this.user.banned
    this.canStarRate = this.canStarRate && !(this.user.history.filter(order => order.name == this.dish.name).length == 0)
    return this.canStarRate
  }

  block() : void {
    this.canStarRate = false
    this.user.history.filter(order => order.name == this.dish.name).forEach(entry => entry.starRated = true)
    this.usersService.updateUser(this.user)
  }

  style() {
    if (this.dish.photoURLs.length >= 3)
      return {'width' : '30vw'}
    if (this.dish.photoURLs.length == 2)
      return {'width' : '48vw'}
    return {'width' : '85vw'}
  }
}
