import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapNavPage } from './map-nav';

@NgModule({
  declarations: [
    MapNavPage,
  ],
  imports: [
    IonicPageModule.forChild(MapNavPage),
  ],
})
export class MapNavPageModule {}
