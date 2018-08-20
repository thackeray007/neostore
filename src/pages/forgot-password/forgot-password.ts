import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { AlerttProvider } from '../../providers/alertt/alertt';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { HomePage } from '../home/home';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-forgot-password',
    templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
    public email: string;
    constructor(public platform: Platform, public apip: ApiintegrateProvider, public alertp: AlerttProvider, public url: UrlProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.forgot_pass_Callback = this.forgot_pass_Callback.bind(this);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ForgotPasswordPage');
    }
    forgot_pass_Callback(response) {
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);
        }
        else {
            var a = JSON.parse(response.data);
        };

        if (a.status == 200) {
            console.log(a.status);
            this.navCtrl.setRoot(HomePage);
            console.log(a.status);

        } else {
            console.log(a.statusText);

            this.alertp.presentAlert(a.user_msg);
        }

    }
    gen_pass() {
        var data;
        if (this.platform.is('mobileweb')) {
            data = new FormData();
            data.append('email', this.email);

        }
        else {
            data = { 'email': this.email };
        };


        var method = "post";
        var url = this.url.forgot_pass;
        console.log(data);
        this.apip.apicall(method, url, data, {}, this.forgot_pass_Callback);
        console.log(data);

    }
}
