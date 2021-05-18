import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import { FormsModule } from '@angular/forms';
import {NavParams} from '@ionic/angular';
import { NavController } from "@ionic/angular";
import {MainPagePage} from "../main-page/main-page.page";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  userEmail:string = '';
  userPassword:string = '';;
  userCredentials;
  user;

  constructor(public auth: AngularFireAuth,public navCtrl: NavController) { }


  ngOnInit() {

    this.user = this.auth.currentUser;

    console.log(this.user);
    if (this.user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        console.log("User entrou");

        this.navCtrl.navigateRoot("/main-page");


        // ...
      } else {
        // User is signed out
        console.log("User Saiu");
        // ...
      }
    });


  }


  login(){
    this.auth.signInWithEmailAndPassword(this.userEmail,this.userPassword).then((userCredential) => {

      this.userCredentials = userCredential;
      console.log(this.userCredentials);

    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }











  test(){
    console.log(this.userEmail);
    console.log(this.userPassword);
  }








}
