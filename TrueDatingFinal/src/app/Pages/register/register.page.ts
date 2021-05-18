import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerUserEmail;
  registerUserPassword;
  registerConfirmPassword;



  constructor(public auth: AngularFireAuth,public navCtrl: NavController) { }

  ngOnInit() {

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



  Register(){
    console.log("Registare Novos user");
    this.auth.createUserWithEmailAndPassword(this.registerUserEmail, this.registerUserPassword)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  }


  test(){
    console.log(this.registerUserEmail);
    console.log(this.registerUserPassword);
  }


}
