import {Component, Input, OnInit} from '@angular/core';
import {Rate} from "./rate";

@Component({
  selector: 'app-dish-review',
  templateUrl: './dish-review.component.html',
  styleUrls: ['./dish-review.component.css']
})
export class DishReviewComponent implements OnInit {
  @Input() rate !: Rate

  constructor() { }

  ngOnInit(): void {
  }

}
