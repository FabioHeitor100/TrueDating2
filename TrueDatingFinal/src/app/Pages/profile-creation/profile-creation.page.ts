import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {NavController} from "@ionic/angular";
import {AngularFireDatabase} from "@angular/fire/database";
import {CameraResultType, Plugins} from '@capacitor/core';
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.page.html',
  styleUrls: ['./profile-creation.page.scss'],
})
export class ProfileCreationPage implements OnInit {




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
      } else{
        console.log("No user");
        this.navCtrl.navigateRoot("/login");
      }
    })
  }





  async openGalery(imageNumber) {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // Can be set to the src of an image now
    //this.userImage = image.webPath;
    //console.log(this.userImage.src);
    console.log(image);
    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`,512);
    console.log(blobData);
    //this.userImage = image.base64String;

    //console.log(URL.createObjectURL(blobData));

   //this.userImage = URL.createObjectURL(blobData);


   var myImage = document.querySelector('img');


    //myImage.src = URL.createObjectURL(blobData);



   // console.log(myImage.src);

      this.registerImages(blobData,imageNumber);



  }


  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }














  registerProfile(){

    this.db.object(`users/${this.userID}`).set({
      name:this.name,
      age: this.age,
      sex: this.sex,
      description: this.description,
      email: this.userInfo.email,
      ID: this.userID,
      images: this.userImages
    });





  }



  registerImages(image,imageNumber){
    const storageRef = this.storage.ref(`${this.userInfo.email}`+ imageNumber);

    storageRef.put(image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      const downloadURLa = snapshot.ref.getDownloadURL();
      // console.log(downloadURLa);
      //
      //
      //
      // storageRef.getDownloadURL().subscribe(url => {
      //
      //   this.userImages[imageNumber-1] = url;
      //   var img2 = document.getElementById('image2');
      //   img2.setAttribute('src', url);
      //   console.log(url);
      // });
      //
      //
      //
      //
      //
      //
      //
      //
       downloadURLa.then(url => {
      //   console.log(url);
      //
       this.userImages[imageNumber-1] = url;
      //
      //   console.log(this.userImages);
      //
      //
      //  // const myImage = document.getElementById("image1") as HTMLImageElement;
      //
      //   console.log(url);
      //   var httpsReference = this.storage.refFromURL(url.toString());
      //
      //   var img = document.getElementById('image1');
      //   img.setAttribute('src', url);
      //
      //
      //
      //
      //   var img3 = document.getElementById('image3');
      //   img3.setAttribute('src', url);
      //
      //   var img4 = document.getElementById('image4');
      //   img4.setAttribute('src', url);
      //   var img5 = document.getElementById('image5');
      //   img5.setAttribute('src', url);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //   console.log(httpsReference);
      //   this.userImage = httpsReference;
      //
      //   //myImage.src = url;
      // //  this.userImage = url.toString();
         })
      //

    });
  }


  getImageTest(){
    const storageRef = this.storage.ref("test");
    console.log(storageRef.getDownloadURL());
  }




  saveImagesUrl(){
   // this.userImages[imageNumber-1] = url;
  }



}
