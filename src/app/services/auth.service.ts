import { Injectable } from '@angular/core';
import firebase from "firebase/compat";
import {map, Observable} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {User} from "../components/users/user";
import {Router} from "@angular/router";
import {UsersService} from "./users.service";
import {AngularFirestoreCollection, AngularFirestore} from "@angular/fire/compat/firestore";
import {BasketService} from "./basket.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;
  serverInfoRef : AngularFirestoreCollection<any>
  info : Observable<any>
  persistence !: {key : string, type : string}

  constructor(public angularFireAuth: AngularFireAuth, private router : Router,
              private usersService : UsersService, private database : AngularFirestore,
              private basketService : BasketService) {

    // @ts-ignore
    this.userData = angularFireAuth.authState;
    this.serverInfoRef = database.collection('/server-info')
    this.info = this.getInfo()
    this.info.subscribe(info => {
      this.persistence = info.filter((elem : {key : string, type : string}) => this.persistence = elem)[0]
    })
  }

  getInfo() : Observable<any> {
    return this.serverInfoRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(change =>
          // @ts-ignore
          ({key : change.payload.doc.id, ...change.payload.doc.data()})
        )))
  }

  signUp(nick : string, email: string, password: string) : void{
    this.angularFireAuth.setPersistence(this.persistence.type).then(() => {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(() => {
        const user : User = {
          nick : nick,
          email : email,
          roles : ['customer'],
          history : [],
          banned : false
        }
        this.usersService.addUser(user)
        this.router.navigate(['']).then()
      })
        .catch(error => {
          console.log('bad' + error)
        });
    })
  }

  signIn(email: string, password: string) : void {
    this.angularFireAuth.setPersistence(this.persistence.type).then(() => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password).then(() => {
        this.router.navigate(['']).then()
      })
        .catch(error => {
          console.log('bad' + error)
        });
    })
  }

  signOut() {
    this.angularFireAuth.signOut().then();
    this.basketService.basket.clear()
    this.router.navigate(['']).then()
  }

  setPersistence(persistence : string) {
    this.angularFireAuth.setPersistence(persistence).then()
    this.serverInfoRef.doc('persistence').update({type : persistence}).then()
  }
}
