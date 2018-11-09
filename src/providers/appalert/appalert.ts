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

  
  alertTrip(data) {
  return new Promise(resolve=>{
    let alert = this.alertCtrl.create({   
      title: 'New Request',    
      message: `<div><ion-row><ion-col style="font-style:bold">From:</ion-col><h5 style="font-size:12px">${data.from}</h5></ion-row></div>
      <ion-row><ion-col>To:</ion-col><h5 style="font-size:12px">${data.to}</h5></ion-row></div>  `,
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
