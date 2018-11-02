import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AppalertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppalertProvider {

  constructor(public http: HttpClient,private alertCtrl: AlertController) {
    console.log('Hello AppalertProvider Provider');
  }


  alertTrip() {
  return new Promise(resolve=>{
    let alert = this.alertCtrl.create({
      title: 'New Request',
      message: 'From : to : ',
      buttons: [        
        {
          text: 'Accept',
          handler: () => {
           resolve(1)
          }
        },
        {
          text: 'Reject',
          handler: () => {
            console.log('Buy clicked');
            resolve(0)
          }
        }
      ]
    });
    alert.present();
  
  })
}

}
