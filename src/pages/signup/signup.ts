import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';
import { LoaderProvider } from '../../providers/loader/loader';
import { GlobalsProvider } from '../../providers/globals';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user: any = {
    name: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private loader: LoaderProvider, private globalsProvider: GlobalsProvider) {
  }

  ngOnInit() {
    this.loader.hide();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    this.loader.show();
    firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(response => {
        console.log(response);
        this.firebaseUpdateProfile();
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
      });
  }

  firebaseUpdateProfile() {
    let user = firebase.auth().currentUser;
    this.globalsProvider.user = user;
    user.updateProfile({
      displayName: this.user.name,
      photoURL: ""
    }).then(() => {
      // Update successful.
    }).catch(error => {
      console.log(error);
    })
    .then(() => {
      this.loader.hide();
    });
  }
}
