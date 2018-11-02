import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {allApis} from '../../app/globalConfig'
/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapProvider {
  isAvailable: any;
   
  constructor(public http: Http)  { 
    console.log('Hello MapProvider Provider');
    
  }
    
  user_isAvailable(body: Object){
       
    console.log(JSON.stringify(body)+' Body')      
       return new Promise(resolve => {      
       this.http.post(allApis.driverAvailability,body).subscribe(data => {
         console.log(data+' Api data')   
       resolve(data.json());             
       console.log(data);    
       }, err => {
       resolve(err)   
       console.log(err);
       });
       });         
  }

}
