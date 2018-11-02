import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CountriesListProvider } from '../../providers/countries-list/countries-list';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoaderProvider } from '../../providers/loader/loader';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-phone-number',
  templateUrl: 'phone-number.html',
})              
export class PhoneNumberPage {   

  private dialCodes: Array<any> = [];
  searchTerm: string = '';
  private countryList: Array<any> = [];
  private phoneNumberGroup: any;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  verificationId: any;
  verificationId1: any;
  verificationId2: any;
  loading   
  count = 0;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, private cl: CountriesListProvider,
    private storage: Storage, private splashScreen: SplashScreen, private loader: LoaderProvider,) {

    this.phoneNumberGroup = this.fb.group({
      'dialCode': ['+91', Validators.required],   
      'phoneNumber': ['', Validators.required]
    });
  }
     
  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneNumberPage');
    // setTimeout(() => {
    //   this.splashScreen.hide();
    // }, 4000);
  }

  setFilteredItems() {
    console.log('countryList codes', this.searchTerm);
    this.countryList = this.cl.getCountryNames(this.searchTerm);
    console.log('countryList codes', this.countryList);
  }

  filterCountryCode(country) {
    console.log('country Dial codes', country);
    this.countryList = [];
    this.searchTerm = '';
    this.dialCodes = this.cl.getCountryCoodes(country);
    this.phoneNumberGroup.patchValue({ dialCode: this.dialCodes[0] });
    console.log('Dial codes', this.dialCodes);
  }

  
  sendOTP() {
    this.loader.presentLoading('Please wait..');
    this.loading = true   

    let phone = this.phoneNumberGroup.value.dialCode + this.phoneNumberGroup.value.phoneNumber.replace(/\D+/g, '');
    console.log("Phone Number: " + phone);
    alert('Phone Number: '+phone);   

    (<any>window).FirebasePlugin.verifyPhoneNumber(phone, 60, (credential) => {    
     
        if(this.count==0){
         this.count++
          this.verificationId1 = credential.verificationId;   
          alert("V1: " + this.verificationId1);
        }   

        this.loader.loadingDismiss();
        
        this.navCtrl.setRoot("VerificationPage", {
          'phoneNumber': phone,   
          'verificationId': this.verificationId1
        });

    }, function (error) {
      this.loader.loadingDismiss();
      
      alert("Error: " + error);
    });


  }

  trimLastCharacter(value) {
    console.log('ionViewDidLoad value', value);
    console.log('ionViewDidLoad value', value.length);
    // Determine de max length to trim the extra character
    if (value.length >= 15) {
      this.phoneNumberGroup.patchValue({ phoneNumber: value.slice(0, -1) })
    }
  }   

  login(){
   var  window:any;
    
    // this.loader.presentLoading('Please wait..');         
    this.loading = true   

    let phone = this.phoneNumberGroup.value.dialCode + this.phoneNumberGroup.value.phoneNumber.replace(/\D+/g, '');
    console.log("Phone Number: " + phone);
    alert('Phone Number: '+phone);   
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    var appVerifier = window.recaptchaVerifier;
    alert('reCaptcha :'+JSON.stringify(appVerifier))     
    firebase.auth().signInWithPhoneNumber(phone,appVerifier)
    .then(function (confirmationResult) {
    alert(' Message Sent :'+confirmationResult);
      
    this.navCtrl.setRoot("VerificationPage", {      
      'phoneNumber': phone,   
      'verificationId':confirmationResult.verificationId
    });

    }).catch(function (error) {
      // Error; SMS not sent    
      // ...
      alert('Error :'+error)       
    });
  }
}        
         