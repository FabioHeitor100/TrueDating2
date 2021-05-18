import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  constructor(public auth: AngularFireAuth,public navCtrl: NavController) { }

  ngOnInit() {


    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        console.log("User entrou");




        // ...
      } else {
        // User is signed out
        console.log("User Saiu");
        this.navCtrl.navigateRoot("/login");
        // ...
      }
    });
  }






  logOut(){
    this.auth.signOut().then(() => {
      // Sign-out successful.
      console.log("Logout Bem sucedido");
    }).catch((error) => {
      // An error happened.
    });
  }


}
