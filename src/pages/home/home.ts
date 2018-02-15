import { Component } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';

import { RoundProgressModule, RoundProgressConfig } from 'angular-svg-round-progressbar';
import * as firebase from 'firebase';
import * as moment from 'moment';

import { LoaderProvider } from '../../providers/loader/loader';
import { QrscannerPage } from '../qrscanner/qrscanner';
import { GlobalsProvider } from '../../providers/globals';
import { HttpProvider } from '../../providers/http/http.service';
import { ConstVariables } from '../../providers/const';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  maxMinute: number = 540;
  current: number = 0;
  max: number = 100;
  user: any = {
    name: '',
    email: '',
    inTime: '데이터가 없습니다.',
    outTime: '데이터가 없습니다.',
    workedHour: '데이터가 없습니다.'
  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private loader: LoaderProvider, private globalsProvider: GlobalsProvider, public events: Events, private httpProvider: HttpProvider, private config:
    RoundProgressConfig) {
    config.setDefaults({
      color: '#4dcbcd',
      background: '#e2e6f7',
      duration: 800,
      rounded: false
    });
    events.subscribe("in", data => {
      console.log("출근 처리");
      this.getTodayCommuteHistory();
    });
    events.subscribe("out", () => {
      console.log("퇴근 처리");
      this.getTodayCommuteHistory();
    });
  }

  ngOnInit() {
    let user = firebase.auth().currentUser;
    this.user.name = user.displayName;
    this.user.email = user.email;
    // this.user.inTime = (this.globalsProvider.inTime != null) ? this.globalsProvider.inTime : '데이터가 없습니다.';
    // this.user.outTime = (this.globalsProvider.outTime != null) ? this.globalsProvider.outTime : '데이터가 없습니다.';
    this.globalsProvider.user = user;
    this.getTodayCommuteHistory();
  }

  getTodayCommuteHistory() {
    this.loader.show('', ConstVariables.initLoadingTime);
    this.httpProvider.commuteHistory(this.user.email)
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response.in.is_exist) {
            this.user.inTime = response.in.checked_at;
            this.current = this.setPercentage(moment().format(), this.user.inTime);
          }

          if (response.out.is_exist) {
            this.user.outTime = response.out.checked_at;
            this.user.workedHour = this.setWorkedHour(this.user.outTime, this.user.inTime);
            this.current = this.setPercentage(this.user.outTime, this.user.inTime);
          }

        },
        (error: any) => {
          console.log(error);
          this.loader.show(error.message, ConstVariables.errorLoadingTime);
        },
        () => {
          this.loader.hide();
        }
      );
  }

  refresh() {
    this.getTodayCommuteHistory();
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
            this.loader.show('', ConstVariables.initLoadingTime);
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
      this.loader.show(error.message, ConstVariables.errorLoadingTime);
    })
      .then(() => {
        this.loader.hide();
      });
  }

  goQrcode(method) {
    if (method == 'in') {
      this.navCtrl.push(QrscannerPage, { email: this.user.email, method: method }, { animate: false });
    }
    else if (method == 'out') {
      this.navCtrl.push(QrscannerPage, { email: this.user.email, method: method }, { animate: false });
    }
    else {
      // empty method..
    }
  }

  /**
   * 두 시간의 차이를 구하는 함수
   * (t1 - t2)
   * @param t1 
   * @param t2 
   * @returns X시간 Y분 Z초
   */
  setWorkedHour(t1, t2) {
    let tmp = moment(t1, 'YYYY-MM-DD HH:mm:ss').diff(moment(t2, 'YYYY-MM-DD HH:mm:ss'));
    if (moment.duration(tmp).hours() == 0 && moment.duration(tmp).minutes() == 0) {
      return moment.duration(tmp).seconds() + '초';
    }
    else if (moment.duration(tmp).hours() == 0) {
      return moment.duration(tmp).minutes() + '분 ' + moment.duration(tmp).seconds() + '초';
    }
    else {
      return moment.duration(tmp).hours() + '시간 ' + moment.duration(tmp).minutes() + '분 ' + moment.duration(tmp).seconds() + '초';
    }
  }

  /**
   * 두 시간의 차이를 구하고, 9시간 100%를 기준으로 %를 반환하는 함수
   * (t1 - t2)%
   * @param t1 
   * @param t2 
   * @returns X%
   */
  setPercentage(t1, t2) {
    let tmp = moment(t1, 'YYYY-MM-DD HH:mm:ss').diff(moment(t2, 'YYYY-MM-DD HH:mm:ss'));
    if(moment.duration(tmp).minutes() > this.maxMinute) {
      return this.max;
    }
    else {
      return Math.floor(moment.duration(tmp).minutes() / this.maxMinute * 100);
    }
  }
}
