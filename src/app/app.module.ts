import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";

import { FilterPipe } from './pipes/filter.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { BasketComponent } from './components/basket/basket.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrencyChangerComponent } from './components/currency-changer/currency-changer.component';
import { DishComponent } from './components/dishes/dish/dish.component';
import { DishOrderCardComponent } from './components/dishes/dish/dish-order-card/dish-order-card.component';
import { DishImageComponent } from './components/dishes/dish/dish-image/dish-image.component';
import { DishDescriptionComponent } from './components/dishes/dish/dish-description/dish-description.component';
import { FilterInputComponent } from './components/filter-input/filter-input.component';
import { SingleDishComponent } from './components/single-dish/single-dish.component';
import { DishReviewComponent } from './components/single-dish/dish-review/dish-review.component';
import { AddDishReviewComponent } from './components/single-dish/add-dish-review/add-dish-review.component';
import { DishRatingComponent } from './components/single-dish/dish-rating/dish-rating.component';
import { StarComponent } from './components/single-dish/dish-rating/star/star.component';
import { UsersComponent } from './components/users/users.component';
import { SignInComponent } from './components/header/sign-in/sign-in.component';
import { SignUpComponent } from './components/header/sign-up/sign-up.component';
import { DishManagerComponent } from './components/dish-manager/dish-manager.component';
import { EditDishComponent } from './components/dish-manager/edit-dish/edit-dish.component';
import {AdminGuard} from "./guards/admin.guard";
import {ManagerGuard} from "./guards/manager.guard";
import {CustomerGuard} from "./guards/customer.guard";


const routes : Routes = [
  {path: '', component : HomeComponent},
  {path: 'menu', component: DishesComponent},
  {path: 'dish-manager', component: DishManagerComponent, canActivate : [ManagerGuard]},
  {path: 'basket', component: BasketComponent, canActivate : [CustomerGuard]},
  {path : 'menu/:key', component: SingleDishComponent, canActivate : [CustomerGuard]},
  {path: 'dish-manager/:key', component: SingleDishComponent, canActivate: [CustomerGuard]},
  {path : 'sign-in', component: SignInComponent},
  {path : 'sign-up', component : SignUpComponent},
  {path: 'admin-panel', component: UsersComponent, canActivate : [AdminGuard]},
  {path : 'dish-manager/edit/:key', component: EditDishComponent, canActivate : [ManagerGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DishesComponent,
    AddDishComponent,
    BasketComponent,
    HeaderComponent,
    CurrencyChangerComponent,
    DishComponent,
    DishOrderCardComponent,
    DishImageComponent,
    DishDescriptionComponent,
    FilterPipe,
    FilterInputComponent,
    SingleDishComponent,
    DishReviewComponent,
    AddDishReviewComponent,
    DishRatingComponent,
    StarComponent,
    UsersComponent,
    SignInComponent,
    SignUpComponent,
    DishManagerComponent,
    EditDishComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        NgxSliderModule,
        FontAwesomeModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
    ],
  exports : [
    RouterModule
  ],
  providers: [
    FilterPipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
