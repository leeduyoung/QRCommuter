import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';
import { LoaderProvider } from '../../providers/loader/loader';
import { GlobalsProvider } from '../../providers/globals';
import { ConstVariables } from '../../providers/const';

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
    this.loader.show('', ConstVariables.initLoadingTime);
    firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((response: any) => {
        console.log(response);
        this.firebaseUpdateProfile();
      })
      .catch((error: any) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        this.loader.show(errorMessage, ConstVariables.errorLoadingTime);
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
      this.loader.show(error.message, ConstVariables.errorLoadingTime);
    })
    .then(() => {
      this.loader.hide();
    });
  }
}
