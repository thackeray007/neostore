import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { getScrollData } from '../../../node_modules/ionic-angular/umd/components/input/input';
import { AddaddressPage } from '../addaddress/addaddress';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { UrlProvider } from '../../providers/url/url';
import { AlerttProvider } from '../../providers/alertt/alertt';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
/**
 * Generated class for the AddresslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-addresslist',
    templateUrl: 'addresslist.html',
})
export class AddresslistPage {
    address: any;
    name = "shubham thackeray";
    token: any;
    address1: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public apip: ApiintegrateProvider, public url: UrlProvider, public alertp: AlerttProvider) {
        this.getData();
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AddresslistPage');
        this.getData();
        this.token = localStorage.getItem("access_token");
    }
    getData() {
        this.address = JSON.parse(localStorage.getItem("address"));
        console.log(this.address);
        // console.log(JSON.parse(address));
        // console.log(JSON.stringify(this.address));
    }
    add() {
        this.navCtrl.push(AddaddressPage);
    };
    placeOrder() {
        console.log(this.address1);

        var method = "post";
        var url = this.url.order;
        console.log("token", this.token);

        var headers = new Headers({ 'access_token': this.token });

        console.log(headers);
        this.orderCallback = this.orderCallback.bind(this);

        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {
            var data = new FormData();
            data.append('address', this.address1);

            return this.apip.apicall(method, url, data, { headers: headers }, this.orderCallback);
        } else { this.apip.apicall(method, url, data, { 'access_token': this.token }, this.orderCallback); }

    }
    orderCallback(response) {
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);

            // console.log(a.data.access_token);
        }
        else {
            var a = (response);
            console.log("asdasd");

            console.log(response.data);

            // console.log(JSON.parse(response.data).data.access_token)

        };
        console.log(a);
        console.log(a.status);

        if (a.status == 200) {
            console.log(a.status);
            var mess = a.message;
            this.alertp.presentAlert1(mess);
            console.log(a.status);

        } else {
            console.log(a.statusText);
            console.log("fail in callback");
            this.alertp.presentAlert("something went wrong")

            // this.alertp.presentAlert(a.statusText);
        }


    }
}



