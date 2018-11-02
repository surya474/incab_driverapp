import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneNumberPage } from './phone-number';
import { TextMaskModule } from 'angular2-text-mask';
@NgModule({
  declarations: [
    PhoneNumberPage,
  ],
  imports: [
    TextMaskModule,
    IonicPageModule.forChild(PhoneNumberPage),
  ],
})
export class PhoneNumberPageModule {}
