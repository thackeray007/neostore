import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-product-details',
    templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
    public data: any;
    public details: any;
    title: any;
    vendor: any;
    category: any;
    price: any;
    constructor(public url: UrlProvider, public apip: ApiintegrateProvider, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad ProductDetailsPage');
        // this.data = JSON.stringify(this.navParams.get('id'));
        this.data = JSON.stringify(this.navParams.get('id'));
        console.log("data" + this.data);

        this.getdata();
    }
    getdata() {

        var method = "get";
        var url = this.url.details;
        console.log(this.data);
        var headers = new Headers({ 'product_id': "1" });

        console.log(headers);
        this.detailsCallback = this.detailsCallback.bind(this);
        var options = new RequestOptions({ headers: headers, params: { 'product_id': "1" } });
        return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);

    }
    detailsCallback(response) {
        // console.log(response._body);
        // if (this.platform.is('mobileweb')) {
        var a = JSON.parse(response._body);

        console.log("asddsa" + a);
        console.log(JSON.parse(response._body));


        // }
        // else {
        //     var a = (response);
        //     console.log("asdasd");
        //     console.log(response.data);
        //     console.log(JSON.parse(response.data).data.access_token)
        //     // // console.log(JSON.parse(response.data.access_token));
        //     // console.log(JSON.parse(response.data.data));
        //     // console.log(JSON.parse(response.data.data.access_token));
        //     // console.log(JSON.parse(a.data))
        //     // // console.log(JSON.parse(a.data.access_token));
        //     // // console.log("json" + response.data.access_token.JSON);

        //     // console.log(a.data.access_token);
        //     // console.log(a.headers.data.access_token);
        // };
        // console.log(a);
        // console.log(a.status);
        if (a.status == 200) {
            console.log("asda", a.data);
            // this.navCtrl.setRoot(LoaderPage);
            this.details = a.data;

            this.title = a.data.name;
            this.vendor = a.data.producer;
            this.category = a.data;
            // this.price = this.details.price;
            console.log(this.details);
            console.log(this.vendor);
            console.log(this.category);
            console.log("final");




            // this.rating = this.abcd.rating;
            // this.abcd = a.data;
            console.log("asdasdasd", this.details);
            // this.abcd = a.data;
            console.log("asd" + this.details);

        } else {
            console.log(a.statusText);

            // this.alertp.presentAlert(a.statusText);
        }


    }
}

