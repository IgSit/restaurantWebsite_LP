import {Component, OnDestroy, OnInit} from '@angular/core';
import {DishesService} from "../../../services/dishes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Dish} from "../../dishes/dish/dish";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit, OnDestroy {
  key !: string;
  dish !: Dish;
  dishesSubscription !: Subscription;
  modelForm !: FormGroup;
  formErrors : Map<string, string>;
  validationMessages : Map<string, Map<string, string>>;

  constructor(private dishesService : DishesService, private route : ActivatedRoute,
              private router : Router, private formBuilder : FormBuilder) {
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
    this.key = this.route.snapshot.params['key'];
    this.dishesSubscription = this.dishesService.getDishes().subscribe((dishes : Dish[]) => {
      dishes = dishes.filter((d : Dish) => (d.key == this.key))
      this.dish = dishes[0]
    });

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

  ngOnDestroy() {
    this.dishesSubscription.unsubscribe()
  }

  onSubmit(form: FormGroup) {
    const newDish: Dish = {
      name: form.value.name,
      cuisine: form.value.cuisine,
      category: form.value.category,
      ingredients: form.value.ingredients,
      maxPerDay: form.value.maxPerDay,
      price: parseFloat(form.value.price),
      description: form.value.description,
      photoURLs: this.dish.photoURLs,
      rate : 0,
      reviews : []
    }
    if (form.valid) {
      this.dishesService.updateDish(newDish)
      this.formErrors.forEach((_:string, key:string) => {this.formErrors.set(key, '')})
      this.router.navigate(['/dish-manager']).then()
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

  style() {
    if (this.dish.photoURLs.length >= 3)
      return {'width' : '30vw'}
    if (this.dish.photoURLs.length == 2)
      return {'width' : '48vw'}
    return {'width' : '85vw'}
  }

  back() : void {
    this.router.navigate(['/dish-manager']).then()
  }
}
