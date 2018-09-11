
import { Injectable, ViewChild } from '@angular/core';
import { AlertController, Platform, NavController, LoadingController } from 'ionic-angular';
import { NeostorePage } from '../../pages/neostore/neostore';
import { bind } from '../../../node_modules/@angular/core/src/render3/instructions';
import { Network } from '../../../node_modules/@ionic-native/network';

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

    constructor(public alertcontroller: AlertController, public platform: Platform, public loadingCtrl: LoadingController, public network: Network) {
        console.log('Hello AlerttProvider Provider');
        // this.loading = this.loading.bind(this)
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
        let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            this.loading.Dismiss();
            setTimeout(() => {
                this.presentExit();
            }, 0);

            //console.log('network was disconnected :-(');
        });

    }
    presentExit() {
        let alert = this.alertcontroller.create({
            title: 'NO Network',
            message: 'whoooaaa no internet-access!!! Do you want to exit NeoSTORE??',
            buttons: [
                {
                    text: 'Try Again',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Exit',
                    handler: () => {
                        console.log('Buy clicked');
                        this.platform.exitApp();
                    }
                }
            ]
        });
        alert.present();
    }

    valid(data) {
        if (data == undefined || data == null) {
            this.presentAlertt("validation error", "field cant be blank");
            return 1;
        }
    }
}
