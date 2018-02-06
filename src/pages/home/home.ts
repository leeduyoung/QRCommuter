import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import * as firebase from 'firebase';

import { LoaderProvider } from '../../providers/loader/loader';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = {
    name: '',
    email: ''
  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private loader: LoaderProvider) {
  }

  ngOnInit() {
    let user = firebase.auth().currentUser;
    this.user.name = user.displayName;
    this.user.email = user.email;
  }

  logout() {
      let alert = this.alertCtrl.create({
        title: '로그아웃',
        message: '정말 로그아웃 하시겠습니까?',
        buttons: [
          {
            text: '아니요',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '예',
            handler: () => {
              this.loader.show();
              this.firebaseLogout();
            }
          }
        ]
      });
      alert.present();
  }

  firebaseLogout() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch(error => {
      console.log(error);
    })
    .then(() => {
      this.loader.hide();
    });
  }
}
