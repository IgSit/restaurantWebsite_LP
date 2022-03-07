import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FilterService} from "../../services/filter.service";
import {LabelType, Options} from "@angular-slider/ngx-slider";
import {FilterPipe} from "../../pipes/filter.pipe";
import {CurrencyChangerService} from "../../services/currency-changer.service";
import {Dish} from "../dishes/dish/dish";
import {DishesService} from "../../services/dishes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.css']
})
export class FilterInputComponent implements OnInit, OnDestroy {

  options: Options = {
    floor: 0,
    ceil: 50,
    step: 0.01,

    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return 'Min price: ' + value;
        case LabelType.High:
          return 'Max price: ' + value;
        default:
          return value.toString();
      }
    }
  }
  dishes: Dish[] = []
  filteredDishes : Dish[] = []
  dishesSubscription !: Subscription
  @Output() filteredLengthEmitter : EventEmitter<number> = new EventEmitter<number>()

  constructor(public filterService : FilterService, private currencyChangerService : CurrencyChangerService,
              private filterPipe : FilterPipe, private dishesService : DishesService) { }

  ngOnInit(): void {
    this.dishes = this.dishesService.dishes
    this.dishesSubscription = this.dishesService.getDishes().subscribe((dishes : Dish[]) => {
      this.dishes = dishes
      this.filteredDishes = dishes
    })
  }

  ngOnDestroy() {
    this.dishesSubscription.unsubscribe()
  }

  cuisineSwitch(cuisine : string) : void {
    this.filterService.cuisineSwitch(cuisine)
    this.filteredDishes = this.filterPipe.transform(this.dishes, this.filterService.cuisines,
                                                    this.filterService.categories, this.filterService.maxPrice,
                                                    this.filterService.minPrice, this.currencyChangerService.currency,
                                                    5, 0)
    this.filteredLengthEmitter.emit(this.filteredDishes.length)
  }

  categorySwitch(category : string) : void {
    this.filterService.categorySwitch(category)
    this.filteredDishes = this.filterPipe.transform(this.dishes, this.filterService.cuisines,
                                                    this.filterService.categories, this.filterService.maxPrice,
                                                    this.filterService.minPrice, this.currencyChangerService.currency,
                                                    5, 0)
    this.filteredLengthEmitter.emit(this.filteredDishes.length)
  }
}
