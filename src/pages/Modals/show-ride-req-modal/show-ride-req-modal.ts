import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Renderer } from '@angular/core';
import {   ViewController } from 'ionic-angular';
/**
 * Generated class for the ShowRideReqModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-ride-req-modal',
  templateUrl: 'show-ride-req-modal.html',
})
export class ShowRideReqModalPage {
     data=this.NavParams.get('data')
  constructor(public NavParams:NavParams,public navctrl:NavController,public renderer: Renderer, public viewCtrl: ViewController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'page-show-ride-req-modal', true);
    console.log("in modal data",this.data) 
  }          
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowRideReqModalPage');
  }

}
