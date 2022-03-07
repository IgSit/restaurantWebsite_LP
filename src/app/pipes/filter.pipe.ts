import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../components/dishes/dish/dish";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(dishes : Dish[], cuisines : string[], categories : string[],
            maxPrice : number, minPrice : number, currency: string, maxRate: number, minRate : number) : Dish[] {
    let output : Dish[] = dishes;
    if (!dishes) return []
    cuisines.forEach((category : string) => {
      category = category.toLowerCase();
      output = output.filter((dish : Dish) => dish.cuisine.includes(category))
    })
    categories.forEach((category : string) => {
      category = category.toLowerCase();
      output = output.filter((dish : Dish) => dish.category.includes(category))
    })
    output = output.filter((dish:Dish) => dish.rate >= minRate && dish.rate <= maxRate)
    if (currency == 'dollar') {
      output = output.filter((dish:Dish) => dish.price >= minPrice && dish.price <= maxPrice)
    }
    else {
      output = output.filter((dish:Dish) => dish.price * 4 / 3 >= minPrice && dish.price * 4 / 3<= maxPrice)
    }
    return output;
  }

}
