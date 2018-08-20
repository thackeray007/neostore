import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
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
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { LoaderPage } from '../loader/loader';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public email: string;
    public Password: string;
    public data: string;
    constructor(public navCtrl: NavController, public alertp: AlerttProvider, public platform: Platform, public apip: ApiintegrateProvider, public url: UrlProvider) {
        console.log(this.url.login);
        this.loginCallback = this.loginCallback.bind(this);

    }
    validate() {
        var data;

        if (this.platform.is('mobileweb')) {
            data = new FormData();
            data.append('email', this.email);
            data.append('password', this.Password);
        }
        else {
            data = { 'email': this.email, 'password': this.Password };
        };




        if (this.email == undefined || this.email == null) {
            var mess = "username can not be empty";
            console.log(this.email);
            this.alertp.presentAlert(mess);
        } else {
            if (this.Password == undefined || this.Password == null) {
                var mess = "password is essential";
                this.alertp.presentAlert(mess);

            } else {


                var method = "post";
                var url = this.url.login;
                console.log(data);
                this.apip.apicall(method, url, data, this.loginCallback);
                console.log(data);
            }
        }
    }


    loginCallback(response) {
        // console.log(response._body);
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);
            localStorage.setItem("access_token", (a.data.access_token));
            console.log(a.data.access_token);

        }
        else {
            var a = (response);
            console.log("asdasd");

            console.log(response.data);

            console.log(JSON.parse(response.data).data.access_token)
            // // console.log(JSON.parse(response.data.access_token));
            // console.log(JSON.parse(response.data.data));
            // console.log(JSON.parse(response.data.data.access_token));
            // console.log(JSON.parse(a.data))
            // // console.log(JSON.parse(a.data.access_token));
            // // console.log("json" + response.data.access_token.JSON);


            // console.log(a.data.access_token);
            // console.log(a.headers.data.access_token);
            localStorage.setItem("access_token", JSON.parse(response.data).data.access_token);
        };
        console.log(a);
        console.log(a.status);

        if (a.status == 200) {
            console.log(a.status);
            this.navCtrl.setRoot(LoaderPage);
            console.log(a.status);
            0
        } else {
            console.log(a.statusText);

            this.alertp.presentAlert(a.statusText);
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
        this.navCtrl.setRoot(LoaderPage);
    }
    new_pass() {
        this.navCtrl.push(ForgotPasswordPage);
    }
}
