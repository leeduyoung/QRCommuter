import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { HttpProvider } from '../../providers/http/http.service';


@IonicPage()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
export class QrscannerPage {

  clubInfo: any;
  // loading: Loading;
  method: any;

  // constructor(public navCtrl: NavController, public qrScanner: QRScanner, private commonService: CommonService) {
  constructor(public navCtrl: NavController, public qrScanner: QRScanner, private navParam: NavParams, private httpProvider: HttpProvider) {
    // this.loading = this.commonService.presentLoading();
    this.method = this.navParam.get('method');
    this.qrscanner();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrscannerPage');
  }

  qrscanner() {
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          console.log('Success to authorized camera permission'); // camera permission was granted

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((qrScannerData: string) => {
            console.log("Scanned data: ", qrScannerData);
            
            if(qrScannerData == 'rfapp') {
              // TODO: 출/퇴근 처리
              this.httpProvider.commute({email: 'dy.lee@hnblife.co.kr', kind: 'in'})
                .subscribe(
                  response => {
                    this.navCtrl.popToRoot();
                  },
                  error => {
                    console.log(error);
                  }
                );
            }
            else {
              // TODO: error popup
            }

            // if(qrScannerData == '' || qrScannerData == null) {
            //   console.log('올바르지 않은 QR코드 입니다.');
            //   this.qrScanner.hide(); // hide camera preview
            //   scanSub.unsubscribe(); // stop scanning
            //   this.navCtrl.pop();
            //   return;
            // }
            
            // try {
            //   this.clubInfo = JSON.parse(atob(qrScannerData));
            //   console.log(this.clubInfo);              

            //   this.qrScanner.hide(); // hide camera preview
            //   scanSub.unsubscribe(); // stop scanning
            //   this.navCtrl.push(CheckInReady, { clubId: this.clubInfo.rf_club_id });
            //   document.querySelector(".tabbar.show-tabbar")['style'].display = 'flex';

            // } catch (error) {
            //   // this.commonService.qrPresentAlert('QR코드 오류','해당 시설 QR코드가 아닙니다. 시설 QR코드 확인 후 다시 시도해 주세요.', this.navCtrl);
            //   throw new Error('qrcode parsing error');
            // }
          }
          , (error: any) => {
            console.log('error');
            // this.commonService.qrPresentAlert('QR코드 오류','해당 시설 QR코드가 아닙니다. 시설 QR코드 확인 후 다시 시도해 주세요.', this.navCtrl);
          });

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show().then(
            (data: QRScannerStatus) => {
              console.log('data.showing: ', data.showing);
              document.querySelector(".tabbar.show-tabbar")['style'].display = 'none';
            },
            error => {
              console.log(error);
              // this.commonService.qrPresentAlert('카메라 권한 설정','카메라 사용 권한이 없습니다. 권한 설정 후 다시 시도해 주세요.', this.navCtrl);
            }
          );

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log('denied');
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          console.log('else');
        } 
      })
      .catch((error: any) => {
        console.log(error);
        // this.commonService.qrPresentAlert('QR코드 오류','오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.', this.navCtrl);
      })
      .then(() => {
        // this.loading.dismiss();
      });
  }

  goBack() {
    document.querySelector(".tabbar.show-tabbar")['style'].display = 'flex';
    this.navCtrl.pop({animate: false});
  }

}
