import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  token: string;
     
  @ViewChild(Nav) nav: Nav;   
     
  rootPage:any = HomePage;         
                    
  constructor(platform: Platform, statusBar: StatusBar, public menuCtrl: MenuController,
    splashScreen: SplashScreen, public storage: Storage,) {
    this.menuCtrl.enable(true, 'menu');    
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

  });
  }     

  navigateToPage(page) {   
    this.nav.setRoot(page);
}
   
}   

   