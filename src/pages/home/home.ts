import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ProductsPage } from '../products/products';
import { Message } from '../../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { AlerttProvider } from '../../providers/alertt/alertt';
import { EmailValidator } from '../../../node_modules/@angular/forms';
import { viewClassName } from '../../../node_modules/@angular/compiler';
import { NeostorePage } from '../neostore/neostore';
import { UrlProvider } from '../../providers/url/url';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public email: string;
    public Password: string;

    constructor(public navCtrl: NavController, public alertp: AlerttProvider, public apip: ApiintegrateProvider, public url: UrlProvider) {
        console.log(this.url.login);
        this.loginCallback = this.loginCallback.bind(this);

    }
    validate() {
        var data = new FormData();
        data.append('email', this.email);
        data.append('password', this.Password);

        if (this.email == undefined || this.email == null) {
            var mess = "username can not be empty";
            console.log(this.email);
            this.alertp.presentAlert(mess);
        } else {
            if (this.Password == undefined || this.Password == null) {
                var mess = "password is essential";
                this.alertp.presentAlert(mess);

            } else if (mess == undefined || mess == "") {


                var method = "post";
                var url = this.url.login;
                console.log(data);
                this.apip.apicall(method, url, data, this.loginCallback);
                console.log(data);
            } else {
                console.log(mess);
                this.alertp.presentAlert(mess);
            }
        }
    }


    loginCallback(response) {
        console.log(response._body);
        var a = JSON.parse(response._body);
        console.log(a);
        console.log(a.status);

        if (a.status == 200) {
            console.log(a.status);
            this.navCtrl.setRoot(NeostorePage);
            console.log(a.status);

        }

    }

    a1() {
        this.navCtrl.push(SignupPage);
    }

    a2() {
        this.navCtrl.setRoot(NeostorePage);
    }
    a3() {
        this.navCtrl.setRoot(ProductsPage);
    }

    a4() {
        this.navCtrl.setRoot(ProductDetailsPage);
    }
}
