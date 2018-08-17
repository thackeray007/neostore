import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NeostorePage } from './neostore';

@NgModule({
  declarations: [
    NeostorePage,
  ],
  imports: [
    IonicPageModule.forChild(NeostorePage),
  ],
})
export class NeostorePageModule {}
