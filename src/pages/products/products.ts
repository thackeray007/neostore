import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
import { toObservable } from '../../../node_modules/@angular/forms/src/validators';
import angularStars = require('ionic1-star-rating/dist/index.js');
/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-products',
    templateUrl: 'products.html',
    // template:
    //     `<ion-icon *ngFor="let n of ratingRange; let i = index" [name]="i < rating ? 'star' : 'star-outline'"></ion-icon>`
})
export class ProductsPage {
    public product1: any = [];
    public abcd: any = [];
    // public rating: any = [];

    constructor(public url: UrlProvider, public apip: ApiintegrateProvider, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        var data: any;
        console.log('ionViewDidLoad ProductsPage');
        data = JSON.stringify(this.navParams.get('id'));
        console.log("data" + data);

        this.postdata(data);
    }

    postdata(data) {

        var method = "get";
        var url = this.url.tile;
        console.log(data);
        var headers = new Headers({ 'product_category_id': data, 'limit': 3, 'page': 1 });
        // headers.append('access_token', data);
        console.log(headers);
        this.tileCallback = this.tileCallback.bind(this);
        var options = new RequestOptions({ headers: headers, params: { 'product_category_id': data } });
        this.apip.apicall(method, url, options, this.tileCallback);
        console.log(data);

    }
    tileCallback(response) {
        // console.log(response._body);

        // if (this.platform.is('mobileweb')) {
        var a = JSON.parse(response._body);

        console.log(a.data);


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
            this.abcd = a.data;
            // this.rating = this.abcd.rating;

            // this.abcd = a.data;
            console.log("asdasdasd", this.abcd);
            // this.abcd = a.data;

            console.log("asd" + this.product1);

        } else {
            console.log(a.statusText);

            // this.alertp.presentAlert(a.statusText);
        }

    }

    getStars(rating) {
        console.log("rating", rating);

        // Round to nearest half

        let output = [];

        // Append all the filled whole stars
        for (var i = rating; i >= 1; i--)
            output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        // If there is a half a star, append it


        // Fill the empty stars
        for (let i = (5 - rating); i >= 1; i--)
            output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        return output.join('');

    }
    a() {
        document.getElementById("stars").innerHTML = this.getStars(3);
    }
}
