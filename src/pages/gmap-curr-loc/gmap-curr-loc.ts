import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LatLng } from '@ionic-native/google-maps';
import { MapProvider } from '../../providers/map/map';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { AppalertProvider } from '../../providers/appalert/appalert';

declare var google;

@IonicPage()
@Component({
  selector: 'page-gmap-curr-loc',
  templateUrl: 'gmap-curr-loc.html',    
})
export class GmapCurrLocPage {
  markers: any;
  location: any;       
  fromLng: number;
  fromLat: number;
  lng: number;
  lat: number;

  googleMaps;
  isAvailable;

  
  @ViewChild('map') mapElement: ElementRef;
  private map;
   uid="5bbd90a684f620dddd9b7977"
  constructor(public modalCtrl:ModalController, public alertProv:AppalertProvider, private socket: Socket,public navCtrl: NavController,private geolocation: Geolocation,
     public navParams: NavParams, public gmap: MapProvider) {
           
    this.isAvailable = false;      
    console.log(this.isAvailable)          
  }

  ionViewDidLoad() {
    this.getCabsData();
    console.log('ionViewDidLoad GmapCurrLocPage');
    this.socket.connect()
    this.socket.on('reqCab', (data) => {
                console.log(data)
           if(data.driverId==this.uid)   {
             console.log("in my id",data)
               this.callAlert(data)
           }  
    });     
    // this.getMessages().subscribe(res=>{
    //   alert(JSON.stringify(res))
    // })
  }     



callAlert(data){ 
     
  // let modal = this.modalCtrl.create("ShowRideReqModalPage",{data:data},{showBackdrop:true, enableBackdropDismiss:true});
  // modal.present();

  this.alertProv.alertTrip(data).then(res=>{
    if(res){
   data['reqStatus']=1
   data['driverId']=this.uid
  this.socket.emit('driverRespForCabRequest',data)
    }    
    else {
      data['reqStatus']=0
      data['driverId']=this.uid
    this.socket.emit('driverRespForCabRequest',data)
    }
  })    
}    
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('reqCab', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

    
  async  getCabsData() {

    await this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp + ' Response')

      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.fromLat = this.lat
      this.fromLng = this.lng
      this.location = new LatLng(this.lat, this.lng);

      console.log(this.lat, this.lng, this.location);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.getLocationView();
  }

  getLocationView() {

    let mapOptions = {
      center: this.location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    console.log(' Console')
    let marker2 = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: this.map.getCenter(),
      title: 'You are here'
    });

    let content = "<h4>You are here!</h4>";

    this.addInfoWindow(marker2, content);

  }


  addInfoWindow(marker, content) {
    console.log(marker, content + ' Add Info')
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });


  }

  getToggle(isAvailable) {
    let json = {
      Mobile_Number: "9908990193",
    }
    if (!isAvailable) {
      this.isAvailable = true;
      json['isAvailable'] = this.isAvailable;
      console.log(this.isAvailable)
      this.gmap.user_isAvailable(json).then((res) => {
        console.log(JSON.stringify(res) + ' res Api');
      })
    } else {
      this.isAvailable = false;
      json['isAvailable'] = this.isAvailable;
      this.gmap.user_isAvailable(json).then((res) => {
        console.log(JSON.stringify(res) + ' res Api');
      })
      console.log(this.isAvailable)
    }

  }
   
}
