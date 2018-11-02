import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginform: FormGroup;
  constructor(public navCtrl: NavController,private FormBuilder: FormBuilder) {

  }

  
Nextpage(){
  this.navCtrl.setRoot('RegisterPage')
}
}
