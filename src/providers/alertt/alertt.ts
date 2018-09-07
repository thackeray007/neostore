
import { Injectable, ViewChild } from '@angular/core';
import { AlertController, Platform, NavController, LoadingController } from 'ionic-angular';
import { NeostorePage } from '../../pages/neostore/neostore';
import { bind } from '../../../node_modules/@angular/core/src/render3/instructions';

/*
  Generated class for the AlerttProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlerttProvider {
    // @ViewChild('myNav') nav: NavController
    // public rootPage = NeostorePage;
    loading: any;
    public platf: any;

    constructor(public alertcontroller: AlertController, public platform: Platform, public loadingCtrl: LoadingController) {
        console.log('Hello AlerttProvider Provider');
        this.loading = this.loading.bind(this)
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
            buttons: ['Dismiss']
        });
        alert.present();
    };
    presentLoadingDefault(id) {
        this.loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: id,
        });

        this.loading.present();

    }

}
