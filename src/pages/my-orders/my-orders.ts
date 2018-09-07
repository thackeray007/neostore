import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { UrlProvider } from '../../providers/url/url';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
import { TrackOrderPage } from '../track-order/track-order';
import { AlerttProvider } from '../../providers/alertt/alertt';
/**
 * Generated class for the MyOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-my-orders',
    templateUrl: 'my-orders.html',
})
export class MyOrdersPage {
    token: any;
    abcd: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public apip: ApiintegrateProvider, public url: UrlProvider, public alert: AlerttProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyOrdersPage');
        this.token = localStorage.getItem("access_token");
        this.orderList();
    }
    orderList() {
        this.alert.presentLoadingDefault('Orders-list being prepared');

        var method = "get";
        var url = this.url.orderList;
        var headers = new Headers({ 'access_token': this.token, 'Access-Control-Allow-Headers': 'X-Custom-Header' });


        console.log("headeresw", headers);
        this.orderListCallback = this.orderListCallback.bind(this);

        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {

            return this.apip.apicall(method, url, { headers: headers }, {}, this.orderListCallback);
        } else { this.apip.apicall(method, url, { 'access_token': this.token }, {}, this.orderListCallback); }
    }
    orderListCallback(response) {
        // console.log(response._body);
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);

            console.log(a);
            console.log(response);


        }
        else {
            var a = JSON.parse(response.data);
            console.log("asdasd");
            console.log(response.data);

        };

        if (a.status == 200) {
            console.log(response);
            this.alert.loading.dismiss();

            console.log("asda", a.data);
            this.abcd = a.data;


            // this.navCtrl.setRoot(LoaderPage);

            // this.rating = this.abcd.rating;
            // this.abcd = a.data;
            // console.log("asdasdasd", this.abcd);
            // // this.abcd = a.data;
            // console.log("asd" + this.product1);

        } else {
            console.log(a.statusText);

            // this.alertp.presentAlert(a.statusText);
        }


    }
    trackid(id) {
        this.navCtrl.push(TrackOrderPage, {
            id: id
        })

    }
}
