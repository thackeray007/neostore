import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';

/**
 * Generated class for the TrackOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-track-order',
    templateUrl: 'track-order.html',
})
export class TrackOrderPage {
    id: any;
    token: any;
    abcd: any;
    total: any;
    cost: any;
    loading: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public url: UrlProvider, public apip: ApiintegrateProvider, public platform: Platform, public loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        this.id = this.navParams.get('id');
        console.log(this.id);

        this.token = localStorage.getItem("access_token");
        console.log(this.token);

        console.log('ionViewDidLoad TrackOrderPage');
        this.trackOrder();
    }
    trackOrder() {
        this.presentLoadingDefault();
        var method = "get";
        var url = this.url.track;
        var headers = new Headers({ 'access_token': this.token, 'Access-Control-Allow-Headers': 'X-Custom-Header' });
        var options = new RequestOptions({ headers: headers, params: { 'order_id': this.id } });

        console.log("headeresw", headers);
        this.trackCallback = this.trackCallback.bind(this);

        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {

            return this.apip.apicall(method, url, options, {}, this.trackCallback);
        } else { this.apip.apicall(method, url, { 'access_token': this.token }, { 'order_id': JSON.stringify(this.id) }, this.trackCallback); }
    }
    trackCallback(response) {
        // console.log(response._body);
        this.loading.dismiss();
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);

            console.log("JSON", a);
            console.log("response", response);


        }
        else {
            var a = JSON.parse(response.data);
            console.log("asdasd");
            console.log(response.data);

        };

        if (a.status == 200) {
            console.log(response);

            console.log("asda", a.data);
            this.abcd = a.data.order_details;
            this.cost = a.data.cost;

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
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Please wait...'
        });

        this.loading.present();


    }


}
