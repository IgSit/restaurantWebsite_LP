import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Dish} from "./dish/dish";
import {DishesService} from "../../services/dishes.service";
import {FilterService} from "../../services/filter.service";
import {CurrencyChangerService} from "../../services/currency-changer.service";
import {Subscription} from "rxjs";
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit, OnDestroy {
  dishes : Dish[] = [];
  dishesSubscription !: Subscription
  menuLength : number = 0
  @Input() showFilter !: boolean

  faChevronRight = faChevronRight
  faChevronLeft = faChevronLeft

  pageSize : number = 6
  currentPage = 1
  startPageIndex : number = this.pageSize * (this.currentPage - 1)
  endPageIndex : number = this.pageSize * this.currentPage - 1

  constructor(private dishesService : DishesService, public filterService : FilterService,
              public currencyChangerService : CurrencyChangerService, private router : Router) {

  }

  ngOnInit(): void {
    this.dishes = this.dishesService.dishes
    this.dishesSubscription = this.dishesService.getDishes().subscribe((dishes : Dish[]) => {
     this.dishes = dishes
     this.menuLength = dishes.length
    });
  }
  ngOnDestroy() {
    this.dishesSubscription.unsubscribe()
  }

  hasMaxPrice(dish : Dish) : boolean {
    if (this.currencyChangerService.currency == 'dollar')
      return Math.ceil(dish.price) == this.filterService.maxPrice
    return Math.ceil(dish.price * 4/ 3) == this.filterService.maxPrice
  }

  hasMinPrice(dish : Dish) : boolean {
    if (this.currencyChangerService.currency == 'dollar')
      return Math.floor(dish.price) == this.filterService.minPrice
    return Math.floor(dish.price * 4/ 3) == this.filterService.minPrice
  }

  deleteDish(dish : Dish) : void {
    this.dishesService.deleteDish(dish)
    this.dishes = this.dishes.filter((d : Dish) => d.id !== dish.id)

  }

  onCurrentPage(index : number) : boolean {
    return this.startPageIndex <= index && index <= this.endPageIndex
  }

  nextPage() : void {
    this.currentPage += 1
    this.startPageIndex += this.pageSize
    this.endPageIndex += this.pageSize
  }

  previousPage() : void {
    this.currentPage -= 1
    this.startPageIndex -= this.pageSize
    this.endPageIndex -= this.pageSize
  }

  changePageSize() : void {
    this.pageSize = +this.pageSize
    this.currentPage = 1
    this.startPageIndex = this.pageSize * (this.currentPage - 1)
    this.endPageIndex = this.pageSize * this.currentPage - 1
  }

  updateMenuLength(menuLength : number) : void {
    this.currentPage = 1
    this.startPageIndex = this.pageSize * (this.currentPage - 1)
    this.endPageIndex = this.pageSize * this.currentPage - 1
    this.menuLength = menuLength
  }

  toggleFilter() : void {
    this.showFilter = !this.showFilter
  }

  hasRoute(route : string) : boolean {
    return this.router.url == route
  }

  style(con : boolean) : Object {
    if (con)
      return {
        'background': 'radial-gradient(circle, rgb(173, 76, 58) 0%, rgba(149,31,16,1) 100%)',
        'border': '2px solid #700505'
      }
    return {
      'background': 'radial-gradient(circle, rgb(85, 192, 62) 0%, rgba(80,159,43,1) 100%)',
      'border': '2px solid #358035'
    }
  }
}
