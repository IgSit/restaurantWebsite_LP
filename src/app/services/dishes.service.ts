import { Injectable } from '@angular/core';
import {Dish} from "../components/dishes/dish/dish";
import {map, Observable} from "rxjs";
import {AngularFirestoreCollection, AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class DishesService {
  private dbPath = '/dishes'
  dishesRef : AngularFirestoreCollection<Dish>
  dishes : Dish[] = []


  constructor(private database : AngularFirestore) {
    this.dishesRef = database.collection(this.dbPath)
    this.getDishes().subscribe(dishes => this.dishes = dishes)
  }

  getDishes() : Observable<any>  {
    return this.dishesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(change =>
          // @ts-ignore
          ({key : change.payload.doc.id, ...change.payload.doc.data()})
        )))
  }

  deleteDish(dish: Dish) : void {
    this.dishesRef.doc(dish.key).delete().then()
  }

  addDish(dish: Dish) : void {
    this.dishesRef.add({...dish}).then()
  }

  updateDish(dish : Dish) : void{
    this.dishesRef.doc(dish.key).set(dish).then()
  }
}
