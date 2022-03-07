import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDishReviewComponent } from './add-dish-review.component';

describe('AddDishReviewComponent', () => {
  let component: AddDishReviewComponent;
  let fixture: ComponentFixture<AddDishReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDishReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDishReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
