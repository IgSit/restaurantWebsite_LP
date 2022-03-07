import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishImageComponent } from './dish-image.component';

describe('DishImageComponent', () => {
  let component: DishImageComponent;
  let fixture: ComponentFixture<DishImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
