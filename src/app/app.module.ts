import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CountriesListProvider } from '../providers/countries-list/countries-list';
import * as firebase from 'firebase';
import { LoaderProvider } from '../providers/loader/loader';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { Geolocation } from '@ionic-native/geolocation';   
import { MapProvider } from '../providers/map/map';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AppalertProvider } from '../providers/appalert/appalert';
import { ConfirmcabprovProvider } from '../providers/confirmcabprov/confirmcabprov';
import { ConfigProvider } from '../providers/config/config';
import { HttpClientModule } from '@angular/common/http';
const socketconfig: SocketIoConfig = { url: 'http://incabnode.appspot.com:8810', options: {} };
    //url: 'http://ec2-18-217-223-215.us-east-2.compute.amazonaws.com:8810
var config = {
  apiKey: "AIzaSyBQMOZ_MldImSHRmEE12UCoZPllRrq_PrY",
    authDomain: "incabdriver.firebaseapp.com",
    databaseURL: "https://incabdriver.firebaseio.com",
    projectId: "incabdriver",
    storageBucket: "incabdriver.appspot.com",
    messagingSenderId: "674442216811"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,     
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),      
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    SocketIoModule.forRoot(socketconfig)

  ],     
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
   
    StatusBar,              
    SplashScreen,
    LoaderProvider,   
    GoogleMaps,
    Geolocation,
    Ng4GeoautocompleteModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CountriesListProvider,
    MapProvider,
    AppalertProvider,
    ConfirmcabprovProvider,
    ConfigProvider
  ]
})
export class AppModule {}
