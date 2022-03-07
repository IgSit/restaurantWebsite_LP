import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../dish";

@Component({
  selector: 'app-dish-image',
  templateUrl: './dish-image.component.html',
  styleUrls: ['./dish-image.component.css']
})
export class DishImageComponent implements OnInit {
  @Input() dish !: Dish;
  @Input() inBasket : boolean = false

  constructor() { }

  ngOnInit(): void {

  }

}
