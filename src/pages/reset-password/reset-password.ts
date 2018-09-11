import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { Url } from 'url';
import { AlerttProvider } from '../../providers/alertt/alertt';
import { UrlProvider } from '../../providers/url/url';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';


/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reset-password',
    templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
    pass: any;
    pass1: any;
    pass2: any;
    token: any;
    data: any;
    loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public apip: ApiintegrateProvider, public url: UrlProvider, public alertp: AlerttProvider, public loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ResetPasswordPage');
        this.token = localStorage.getItem("access_token");
        console.log("access_token", this.token);

    }
    editPass($event) {
        if (this.pass == "" || this.pass == undefined) { this.alertp.presentAlert("password cant be blank") }
        else {
            if (this.pass1 == "" || this.pass1 == undefined) { this.alertp.presentAlert("password cant be blank") }
            else {
                if (this.pass2 == "" || this.pass2 == undefined) { this.alertp.presentAlert("password cant be blank") }
                else {
                    $event.buttonDisabled = true;
                    console.log(this.pass);
                    console.log(this.pass1);
                    console.log(this.pass2);

                    this.presentLoadingDefault();
                    var method = "post";
                    var url = this.url.editPass;
                    console.log(this.data);
                    var headers = new Headers({ 'access_token': this.token });

                    console.log(headers);
                    this.profileCallback = this.profileCallback.bind(this);

                    // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
                    // console.log(this.data);
                    if (this.platform.is('mobileweb')) {
                        var data = new FormData();
                        data.append('old_password', this.pass);
                        data.append('password', this.pass1);
                        data.append('confirm_password', this.pass2);

                        this.token = localStorage.getItem("access_token");
                        return this.apip.apicall(method, url, data, { headers: headers }, this.profileCallback);
                    } else { this.apip.apicall(method, url, { 'old_password': this.pass, 'password': this.pass1, 'confirm_password': this.pass2, }, { 'access_token': this.token }, this.profileCallback); }



                    // if (this.platform.is('mobileweb')) {
                    //     this.data = new FormData();
                    //     this.data.append('access_token', this.token);

                    // }
                    // else {
                    //     this.data = { 'access_token': this.token };
                    // };

                    // var method = "post";
                    // var url = this.url.add;
                    // console.log(this.data);
                    // this.apip.apicall(method, url, this.data, {}, this.addCallback);
                }   // // console.log(data);
            }
        }
    }

    profileCallback(response) {
        this.loading.dismiss();
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);

            // console.log(a.data.access_token);

        }
        else {
            var a = (response);
            console.log("asdasd");

            console.log(response.data);

            // console.log(JSON.parse(response.data).data.access_token)
            // // console.log(JSON.parse(response.data.access_token));
            // console.log(JSON.parse(response.data.data));
            // console.log(JSON.parse(response.data.data.access_token));
            // console.log(JSON.parse(a.data))
            // // console.log(JSON.parse(a.data.access_token));
            // // console.log("json" + response.data.access_token.JSON);


            // console.log(a.data.access_token);
            // console.log(a.headers.data.access_token);

        };
        console.log(a);
        console.log(a.status);

        if (a.status == 200) {
            console.log(a);
            // this.alertp.presentAlert1("account updated successfully!");
            console.log(a.status);
            this.alertp.presentAlertt("Password Changed", "Password Chenged successfully");
            // this.navCtrl.setRoot(NeostorePage);
            // this.events.publish('details:updated', this.f_name, this.l_name, this.email, this.dob, this.number, this.dp);

        } else {
            console.log(a.statusText);
            console.log("fail in callback");
            // this.alertp.presentAlert("only upto 8 items are deliverable")

            this.alertp.presentAlert(a.statusText);
        }

    }
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'password being changed'
        });

        this.loading.present();


    }
}
