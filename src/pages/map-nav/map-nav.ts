import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
declare var google;

@IonicPage()
@Component({
  selector: 'page-map-nav',
  templateUrl: 'map-nav.html',
})
export class MapNavPage {

  constructor(public navCtrl: NavController, private platform: Platform) {

  }
  
  ngAfterViewInit() {
      this.platform.ready().then(() => {
          this.loadMap();            
      })
  }
      
  loadMap() {
      // from: 25.386633, 55.459974 to 25.394050, 55.454414
//        let map: GoogleMap = this.googleMaps.create(document.getElementById('map'));
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
      let map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
      });
      directionsDisplay.setMap(map);
      directionsService.route({
              origin: new google.maps.LatLng(25.394050, 55.454414),
              destination:new google.maps.LatLng(25.386633, 55.459974),
              travelMode: 'DRIVING'
          }, function(response, status) {
          if (status == 'OK') {
              directionsDisplay.setDirections(response);
          }
      });
  }
}
