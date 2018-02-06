import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';

import * as firebase from 'firebase';
import { LoaderProvider } from '../../providers/loader/loader';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loader: LoaderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.loader.show();
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
      })
      .then(() => {
        this.loader.hide();
      });
  }

  goSignup() {
    this.loader.show();
    this.navCtrl.push(SignupPage);
  }

  goResetPassword() {
    let alert = this.alertCtrl.create({
      title: '비밀번호 재설정',
      message: '이메일을 적어주시면, 비밀번호 재설정 링크를 보내드립니다. :)',
      inputs: [
        {
          name: 'email',
          placeholder: 'example@gmail.com'
        }
      ],
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '보내기',
          handler: data => {
            this.firebaseSendPasswordResetEmail(data.email);
          }
        }
      ]
    });
    alert.present();
  }

  firebaseSendPasswordResetEmail(email) {
    let auth = firebase.auth();
    auth.sendPasswordResetEmail(email)
      .then(() => {
        // Email sent.
      }).catch(error => {
        console.log(error);
      });
  }
}