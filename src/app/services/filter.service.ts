import {Injectable, Input} from '@angular/core';
import {FilterPipe} from "../pipes/filter.pipe";
import {CurrencyChangerService} from "./currency-changer.service";
import {Dish} from "../components/dishes/dish/dish";
import {DishesService} from "./dishes.service";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterPipe : FilterPipe = new FilterPipe();
  @Input() dishes: Dish[] = [];
  @Input() cuisines: string[] = [];
  @Input() categories: string[] = [];
  @Input()  minPrice: number = 0;
  @Input() maxPrice: number = 1000;
  @Input() maxRate: number = 5;
  @Input() minRate : number = 0;

  constructor(private dishesService : DishesService, private currencyChangerService : CurrencyChangerService) {
    this.dishesService.getDishes().subscribe((dishes : Dish[]) => {
      this.dishes = dishes
      this.updatePrices()
    });
    this.dishes = dishesService.dishes
  }

  getAllCuisines() : string[]{
    let cuisines = new Set();
    this.dishes.forEach(dish => {
      dish.cuisine.forEach((cat : string) => cuisines.add(cat))
    })
    // @ts-ignore
    return [...cuisines];
  }

  getAllCategories() : string[]{
    let categories = new Set();
    this.dishes.forEach(dish => {
      dish.category.forEach((cat : string) => categories.add(cat))
    })
    // @ts-ignore
    return [...categories];
  }

  categorySwitch(category: string) : void {
    if (this.categories.includes(category)) {
      this.categories.splice(this.categories.indexOf(category), 1);
    } else {
      this.categories.push(category);
    }
    this.categories = Object.assign([], this.categories);
    this.updatePrices();
  }

  cuisineSwitch(cuisine: string) : void {
    if (this.cuisines.includes(cuisine)) {
      this.cuisines.splice(this.cuisines.indexOf(cuisine), 1);
    } else {
      this.cuisines.push(cuisine);
    }
    this.cuisines = Object.assign([], this.cuisines);
    this.updatePrices();
  }

  updatePrices() : void {
    this.minPrice = Math.floor(this.getMinPrice());
    this.maxPrice = Math.ceil(this.getMaxPrice());
  }

  getMinPrice() : number {
    let output : Dish[] = this.filterPipe.transform(this.dishes, this.cuisines, this.categories, Infinity, 0,
      this.currencyChangerService.currency, this.maxPrice, this.minRate)
    let minimum : number = Infinity;
    if (this.currencyChangerService.currency == 'dollar')
      output.forEach((dish:Dish) => minimum = Math.min(minimum, dish.price))
    else
      output.forEach((dish:Dish) => minimum = Math.min(minimum, dish.price * 4 / 3))
    return minimum;
  }

  getMaxPrice() : number {
    let output : Dish[] = this.filterPipe.transform(this.dishes, this.cuisines, this.categories, Infinity, 0,
      this.currencyChangerService.currency, this.maxPrice, this.minRate)
    let maximum : number = 0;
    if (this.currencyChangerService.currency == 'dollar')
      output.forEach((dish:Dish) => maximum = Math.max(maximum, dish.price))
    else
      output.forEach((dish:Dish) => maximum = Math.max(maximum, dish.price * 4/ 3))
    return maximum;
  }
}
