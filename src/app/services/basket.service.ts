import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Dish} from "../components/dishes/dish/dish";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket : Map<string, number>
  subject : BehaviorSubject<Map<string, number>>

  constructor() {
    this.basket = new Map<string, number>()
    this.subject = new BehaviorSubject<Map<string, number>>(this.basket)
  }

  getBasket() {
    this.subject.next(this.basket)
    console.log(this.basket)
  }

  updateBasket(dish : Dish, difference : number) : void {
    // @ts-ignore
    let prevValue : number = (this.basket.get(dish.name) !== undefined) ? this.basket.get(dish.name) : 0
    this.basket.set(dish.name, prevValue + difference)
    this.subject.next(this.basket)
  }
}
