import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderProvider {

  loading: Loading;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoaderProvider Provider');
  }

  show(content, duration) {
    if (this.loading != null || this.loading != undefined)
      this.hide();

    if (content == "" || content == " ") {
      this.loading = this.loadingCtrl.create({
        content: content,
        duration: duration
      });
    } else {
      this.loading = this.loadingCtrl.create({
        spinner: "hide",
        content: content,
        duration: duration
      });
    }
    this.loading.present();
  }

  hide() {
    this.loading.dismiss();
  }
}
