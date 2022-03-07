import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {User} from "../components/users/user";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private dbPath = '/users'
  usersRef : AngularFirestoreCollection<User>
  users : Observable<any>

  constructor(public database : AngularFirestore) {
    this.usersRef = database.collection(this.dbPath)
    this.users = this.getUsers()
  }

  getUsers() : Observable<any> {
    return this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(change =>
          // @ts-ignore
          ({key : change.payload.doc.id, ...change.payload.doc.data()})
        )))
  }

  addUser(user : User) : void {
    this.usersRef.add({...user}).then()
  }

  updateUser(user : User) : void{
    this.usersRef.doc(user.key).set(user).then()
  }
}
