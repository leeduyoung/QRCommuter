import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Toast } from '@ionic-native/toast';

import * as moment from 'moment';

import { HttpProvider } from '../../providers/http/http.service';
import { ConstVariables } from '../../providers/const';
import { GlobalsProvider } from '../../providers/globals';


@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
export class QrscannerPage {

  clubInfo: any;
  method: any;
  kind: string;
  email: string;

  constructor(public navCtrl: NavController, public qrScanner: QRScanner, private navParam: NavParams, private httpProvider: HttpProvider, private platform: Platform, private toast: Toast, private globalsProvider: GlobalsProvider, public events: Events) {
    this.email = this.navParam.get('email');
    this.method = this.navParam.get('method');
    if (this.method == 'in') {
      this.kind = '출근';
    }
    else {
      this.kind = '퇴근';
    }
  }

  ionViewDidLoad() {
    this.qrscanner();
  }

  qrscanner() {

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe((qrScannerData: string) => {
            console.log("Scanned data: ", qrScannerData);

            if (qrScannerData == 'rfapp') {
              this.httpProvider.commute({ email: this.email, kind: this.method })
                .subscribe(
                  response => {
                    
                    console.log(response);
                    if (this.method == 'in') {
                      this.globalsProvider.inTime = moment().format('YYYY-MM-DD HH:mm:ss');
                      this.events.publish('in', {time: this.globalsProvider.inTime});
                    }
                    else {
                      this.globalsProvider.outTime = moment().format('YYYY-MM-DD HH:mm:ss');
                      this.events.publish('out', {time: this.globalsProvider.outTime});
                    }

                    this.qrScanner.hide();
                    scanSub.unsubscribe();
                    this.navCtrl.popToRoot();
                    this.toast.show(response.message, ConstVariables.errorLoadingTime, 'center').subscribe(toast => { console.log(toast); });
                  },
                  error => {
                    console.log(error);
                    this.qrScanner.hide();
                    scanSub.unsubscribe();
                    this.navCtrl.popToRoot();
                    if (!this.platform.is('mobileweb'))
                      this.toast.show('QR코드 오류. 잠시후 다시 시도해주세요. ' + error, ConstVariables.errorLoadingTime, 'center').subscribe(toast => { console.log(toast); });
                  });
            }
            else {
              if (!this.platform.is('mobileweb'))
                this.toast.show('잘못된 QR코드 입니다. QR코드를 확인해주세요.', ConstVariables.errorLoadingTime, 'center').subscribe(toast => { console.log(toast); });

              this.qrScanner.hide();
              scanSub.unsubscribe();
              this.navCtrl.popToRoot();
            }
          }, (error: any) => {
            console.log(error);
            if (!this.platform.is('mobileweb'))
              this.toast.show('QR코드 오류. 잠시후 다시 시도해주세요. ' + error, ConstVariables.errorLoadingTime, 'center').subscribe(toast => { console.log(toast); });
          });

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show().then(
            (data: QRScannerStatus) => {
              console.log('data.showing: ', data.showing);
            },
            error => {
              console.log(error);
              if (!this.platform.is('mobileweb'))
                this.toast.show('QR코드 오류. 잠시후 다시 시도해주세요. ' + error, ConstVariables.errorLoadingTime, 'center').subscribe(toast => { console.log(toast); });
            }
          );

        } else if (status.denied) {
          console.log('denied');
          this.navCtrl.popToRoot();
          if (!this.platform.is('mobileweb'))
            this.toast.show('QR코드 권한 오류. status: ' + status.denied, ConstVariables.errorLoadingTime, 'center').subscribe(toast => { console.log(toast); });
        } else {
          console.log('else');
          if (!this.platform.is('mobileweb'))
            this.toast.show('QR코드 오류. 잠시후 다시 시도해주세요.', ConstVariables.errorLoadingTime, 'center').subscribe(toast => { console.log(toast); });
        }
      })
      .catch((error: any) => {
        console.log(error);
        if (!this.platform.is('mobileweb'))
          this.toast.show('QR코드 오류. 잠시후 다시 시도해주세요. ' + error, ConstVariables.errorLoadingTime, 'center').subscribe(toast => { console.log(toast); });
      });
  }

  goBack() {
    this.navCtrl.pop({ animate: false });
  }

}
