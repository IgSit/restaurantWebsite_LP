import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../dish";
import {CurrencyChangerService} from "../../../../services/currency-changer.service";


@Component({
  selector: 'app-dish-description',
  templateUrl: './dish-description.component.html',
  styleUrls: ['./dish-description.component.css']
})
export class DishDescriptionComponent implements OnInit {
  @Input() dish !: Dish;

  constructor(public currencyChangerService : CurrencyChangerService) { }

  ngOnInit(): void {
  }

}
