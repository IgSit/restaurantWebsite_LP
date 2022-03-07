import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dish} from "../../dishes/dish/dish";
import {DishesService} from "../../../services/dishes.service";

@Component({
  selector: 'app-dish-rating',
  templateUrl: './dish-rating.component.html',
  styleUrls: ['./dish-rating.component.css']
})
export class DishRatingComponent implements OnInit {
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;
  rateCounter = 0;
  @Input() dish !: Dish;
  @Input() canRate !: boolean
  @Output() onAddRating : EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private dishesService : DishesService) { }

  ngOnInit(): void {
  }

  enter(rate : number) {
    this.hoverState = rate;
  }

  leave() {
    this.hoverState = 0;
  }

  updateRating(rate : number) {
    this.rating = rate;
    this.rateCounter++;
    let newRate = this.dish.rate + ((rate - this.dish.rate) / this.rateCounter)
    this.dish.rate = Number((Math.round(newRate * 100) / 100).toFixed(2));
    this.dishesService.updateDish(this.dish);
    this.onAddRating.emit(false)
  }

}
