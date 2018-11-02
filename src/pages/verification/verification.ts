import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { LoaderProvider } from '../../providers/loader/loader';

import { timeInterval } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {

  @ViewChild('passcode1') passcode1;
  @ViewChild('passcode2') passcode2;
  @ViewChild('passcode3') passcode3;
  @ViewChild('passcode4') passcode4;
  @ViewChild('passcode5') passcode5;
  @ViewChild('passcode6') passcode6;
  values:any=[];
  value1: number;     
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;

  verificationCode: any;

  phoneNumber: number;
  verificationId: any;

  count: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage,private loader: LoaderProvider,) {
    this.phoneNumber = this.navParams.get('phoneNumber');
    this.verificationId = this.navParams.get('verificationId');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
  }




  

  verify() {
    this.loader.presentLoading('Please wait..');  
      
    this.verificationCode = this.value1 + this.value2 + this.value3 + this.value4 + this.value5 + this.value6;
    // alert("PIN: " + this.verificationCode);

    let signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.verificationCode);
    alert(' SigInCredential: '+signInCredential)
    
    firebase.auth().signInWithCredential(signInCredential).then((info) => {
      alert("valid");

      // alert("Info: " + JSON.stringify(info));

      // alert("UID: " + info.uid)
      // alert("PN: " + info.phoneNumber);


      var uid = info.uid;
      var phno = info.phoneNumber;

      this.storage.set('phno',this.phoneNumber ).then(() => {
      
         
              this.loader.loadingDismiss();
              this.navCtrl.setRoot("RegisterPage");  

      })
    })

  }

  moveFocus(nextElement) {
    nextElement.setFocus();
  }

  resendCode() {

    this.loader.presentLoading('Please wait..');

    // alert(this.phoneNumber);

    this.count = 0;

    (<any>window).FirebasePlugin.verifyPhoneNumber(this.phoneNumber, 60, (credential) => {
     
        if(this.count == 0){
         this.count++
          this.verificationId = credential.verificationId;
          // alert("V: " + this.verificationId);
        }

        this.loader.loadingDismiss();
  
    }, function (error) {
      this.loader.loadingDismiss();

    });


  }

  onKeyUp(event,index){  
    console.log(event);
    if(event.target.value.length !=1){
    this.setFocus(index-2);  
    }else{
    this.values.push(event.target.value);  
    this.setFocus(index);   
    }
    event.stopPropagation();
    }

  
setFocus(index){

  switch(index){
  case 0:
  this.passcode1.setFocus();
  break;
  case 1:
  this.passcode2.setFocus();
  break;
  case 2:
  this.passcode3.setFocus();
  break;
  case 3:
  this.passcode4.setFocus();
  break;
  case 4:
  this.passcode5.setFocus();
  break;
  case 5:
  this.passcode6.setFocus();
  break;
  }
  }
}
