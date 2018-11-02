import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleDirectionPage } from './google-direction';

@NgModule({
  declarations: [
    GoogleDirectionPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleDirectionPage),
  ],
})
export class GoogleDirectionPageModule {}
