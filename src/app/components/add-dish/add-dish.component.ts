import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Dish} from "../dishes/dish/dish";
import {DishesService} from "../../services/dishes.service";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  modelForm !: FormGroup;
  formErrors : Map<string, string>;
  validationMessages : Map<string, Map<string, string>>;

  constructor(private formBuilder : FormBuilder, private dishesService : DishesService) {
    this.formErrors = new Map([
      ['name', ''],
      ['cuisine', ''],
      ['category', ''],
      ['ingredients', ''],
      ['maxPerDay', ''],
      ['price', ''],
      ['description', ''],
      ['photoURLs', ''],
    ]);
    this.validationMessages = new Map([
      ['name', new Map([['required', 'dish name is required']])],
      ['cuisine', new Map([['required', 'cuisine is required']])],
      ['category', new Map([['required', 'category is required']])],
      ['ingredients', new Map([['required', 'ingredients are required']])],
      ['maxPerDay', new Map([['required', 'max amount of dish per day is required'],
        ['min', 'minimum amount per day is 0']])],
      ['price', new Map([['required', 'price is required'],
        ['min', 'minimum price is 0']])],
      ['description', new Map([['required', 'description is required']])],
      ['photoURLs', new Map([['required', 'photo url is required']])],
    ]);
  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ["", Validators.required],
      cuisine: ["", Validators.required],
      category: ["", Validators.required],
      ingredients: ["", Validators.required],
      maxPerDay: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ["", Validators.required],
      photoURLs: ["", Validators.required]
    })
  }

  onSubmit(form: FormGroup) {
    const newDish: Dish = {
      name: form.value.name,
      cuisine: form.value.cuisine.split(','),
      category: form.value.category.split(','),
      ingredients: form.value.ingredients.split(','),
      maxPerDay: form.value.maxPerDay,
      price: form.value.price,
      description: form.value.description,
      photoURLs: form.value.photoURLs.split(','),
      rate : 0,
      reviews : []
    }
    if (form.valid) {
      this.dishesService.addDish(newDish)
      this.modelForm.reset()
      this.formErrors.forEach((_:string, key:string) => {this.formErrors.set(key, '')})
    }
    else {
      this.checkValidity('ignore-dirty');
    }
  }

  checkValidity(mode:string) {
    const form = this.modelForm;

    for (let [key, ] of this.formErrors) {
      this.formErrors.set(key, '');
      let control = form.get(key);
      const modeControl = mode =='check-dirty' ? control?.dirty : true;

      if (control && modeControl && !control.valid) {
        const validationMessages = this.validationMessages.get(key);
        for (const key1 in control.errors) {
          this.formErrors.set(key, validationMessages?.get(key1) + ' ')
        }
      }
    }
  }

}
