
import { Injectable, ViewChild } from '@angular/core';
import { AlertController, Platform, NavController } from 'ionic-angular';
import { NeostorePage } from '../../pages/neostore/neostore';

/*
  Generated class for the AlerttProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlerttProvider {
    // @ViewChild('myNav') nav: NavController
    // public rootPage = NeostorePage;
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
    presentAlertt(title, mess) {
        let alert = this.alertcontroller.create({
            title: title,
            subTitle: mess,
            buttons: [{
                text: 'OK',
                role: 'OK',
                handler: data => {
                    // this.nav.setRoot(NeostorePage)
                }
            },
            ]
        });
        alert.present();
    };

}
