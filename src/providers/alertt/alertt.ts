
import { Injectable } from '@angular/core';
import {AlertController}from 'ionic-angular';

/*
  Generated class for the AlerttProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlerttProvider {

  constructor(public alertcontroller:AlertController) {
    console.log('Hello AlerttProvider Provider');
  }
  presentAlert(mess) {
    let alert = this.alertcontroller.create({
      title: 'fail',
      subTitle: mess,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
