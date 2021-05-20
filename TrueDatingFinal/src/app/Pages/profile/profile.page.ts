import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {NavController} from "@ionic/angular";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userInfo;
  userID;
  name;
  age;
  sex;
  description;



  userImage;
  userImages = [];





  constructor(public auth: AngularFireAuth,public navCtrl: NavController,private db:AngularFireDatabase,private storage: AngularFireStorage) { }

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if(user){
        this.userInfo = user;
        this.userID = user.uid;
        console.log(this.userID);
        console.log(user);
        this.getUserData();
      } else{
        console.log("No user");
        this.navCtrl.navigateRoot("/login");
      }
    })

  }


  getUserData(){
    this.db.object(`users/${this.userID}`).query.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      this.name= data.name;
      this.age = data.age;
      this.description = data.description;
      this.userImages= data.images;
    });
  }


  getImageTest(){
   // var httpsReference = this.storage.refFromURL("https://firebasestorage.googleapis.com/v0/b/dateapp-298de.appspot.com/o/user%2Ftest%40test.com?alt=media&token=1de08d79-15ce-4d89-9ddd-aaf6201df735");

    //httpsReference.getDownloadURL().subscribe(value => {
    var pathReference = this.storage.ref('user');

    pathReference.getDownloadURL().subscribe(value => {
      var img = document.getElementById('image1');
      img.setAttribute('src', value);

      console.log(value);

    });


    const storageRef = this.storage.ref('test@test.com1');
    storageRef.getDownloadURL().subscribe(value => {
      var img3 = document.getElementById('image3');
      img3.setAttribute('src', value);

      console.log(value);

    });

    //})





  }

}
