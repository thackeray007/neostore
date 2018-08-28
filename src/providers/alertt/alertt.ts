
import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';

/*
  Generated class for the AlerttProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlerttProvider {
    public platf: any;
    constructor(public alertcontroller: AlertController, public platform: Platform) {
        console.log('Hello AlerttProvider Provider');
    }
    presentAlert(mess) {
        let alert = this.alertcontroller.create({
            title: 'fail',
            subTitle: mess,
            buttons: ['Dismiss']
        });
        alert.present();
    };

    presentAlert1(mess) {
        let alert = this.alertcontroller.create({
            title: 'THANK YOU',
            subTitle: mess,
            buttons: ['Dismiss']
        });
        alert.present();
    };


}
