import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoaderProvider {

  loading: Loading;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoaderProvider Provider');
  }

  presentLoading(loadingtext) {
    this.loading = this.loadingCtrl.create({
      content: loadingtext
    });
    this.loading.present();
  }

  loadingDismiss() {
    this.loading.dismiss();
  }


}
