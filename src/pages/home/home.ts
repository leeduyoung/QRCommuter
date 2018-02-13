import { Component } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';

import * as firebase from 'firebase';

import { LoaderProvider } from '../../providers/loader/loader';
import { QrscannerPage } from '../qrscanner/qrscanner';
import { GlobalsProvider } from '../../providers/globals';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = {
    name: '',
    email: '',
    inTime: '',
    outTime: ''
  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private loader: LoaderProvider, private globalsProvider: GlobalsProvider, public events: Events) {
    events.subscribe("in", data => {
      console.log("출근 처리: ", data);
      this.user.inTime = data.time;
    });
    events.subscribe("out", data => {
      console.log("퇴근 처리: ", data);
      this.user.outTime = data.time;
    });
  }


  ngOnInit() {
    let user = firebase.auth().currentUser;
    this.user.name = user.displayName;
    this.user.email = user.email;
    this.user.inTime = (this.globalsProvider.inTime != null) ? this.globalsProvider.inTime : '데이터가 없습니다.';
    this.user.outTime = (this.globalsProvider.outTime != null) ? this.globalsProvider.outTime : '데이터가 없습니다.';
    this.globalsProvider.user = user;
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

  goQrcode(method) {
    if(method == 'in') {
      this.navCtrl.push(QrscannerPage, {email: this.user.email, method: method}, {animate: false});
    }
    else if (method == 'out') {
      this.navCtrl.push(QrscannerPage, {email: this.user.email, method: method}, {animate: false});
    }
    else {
      // empty method..
    }
  }
}
