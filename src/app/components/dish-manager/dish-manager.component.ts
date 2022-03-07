import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish-manager',
  templateUrl: './dish-manager.component.html',
  styleUrls: ['./dish-manager.component.css']
})
export class DishManagerComponent implements OnInit {
  showAdd : boolean = false
  showFilter : boolean = false

  constructor() {}

  ngOnInit(): void {
  }

  toggleAdd() : void {
    this.showAdd = !this.showAdd
  }

  toggleFilter() : void {
    this.showFilter = !this.showFilter
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
