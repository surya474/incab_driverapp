import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GmapCurrLocPage } from './gmap-curr-loc';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

@NgModule({
  declarations: [
    GmapCurrLocPage,
  ],
  imports: [
    Ng4GeoautocompleteModule,
    IonicPageModule.forChild(GmapCurrLocPage),
  ],
})
export class GmapCurrLocPageModule {}
