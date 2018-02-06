import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderProvider {

  loading: Loading;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoaderProvider Provider');
  }

  show() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  hide() {
    this.loading.dismiss();
  }
}
