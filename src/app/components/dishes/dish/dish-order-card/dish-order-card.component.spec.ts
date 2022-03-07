import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishOrderCardComponent } from './dish-order-card.component';

describe('DishOrderCardComponent', () => {
  let component: DishOrderCardComponent;
  let fixture: ComponentFixture<DishOrderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishOrderCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
