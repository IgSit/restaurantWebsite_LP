import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  starClassName = "star-rating-blank";
  @Input() starId !: number;
  @Input() rating !: number;
  @Input() canRate !: boolean;
  @Output() leave: EventEmitter<number> = new EventEmitter();
  @Output() enter: EventEmitter<number> = new EventEmitter();
  @Output() submit: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.rating >= this.starId) {
      this.starClassName = "star-rating-filled";
    }
    if (!this.canRate) {
      this.starClassName = "star-rating-submitted"
    }
  }

  onEnter() {
    if (this.canRate) this.enter.emit(this.starId);
  }

  onLeave() {
    if (this.canRate) this.leave.emit(this.starId);
  }

  starClicked() {
    if (this.canRate) this.submit.emit(this.starId);
  }

}
