import { Component, OnInit } from '@angular/core';
import {CurrencyChangerService} from "../../services/currency-changer.service";
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'app-currency-changer',
  templateUrl: './currency-changer.component.html',
  styleUrls: ['./currency-changer.component.css']
})
export class CurrencyChangerComponent implements OnInit {

  constructor(private filterService : FilterService,
              public currencyChangerService : CurrencyChangerService) { }

  ngOnInit(): void {
  }

  toDollar() {
    this.currencyChangerService.currency = 'dollar'
    this.filterService.updatePrices()
  }
  toEuro() {
    this.currencyChangerService.currency = 'euro'
    this.filterService.updatePrices()
  }

}
