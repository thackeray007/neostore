import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
    rating: any;
    links: any;
    link1: any;
    link2: any;
    link3: any;
    link4: any;
    description: any;
    constructor(public platform: Platform, public url: UrlProvider, public apip: ApiintegrateProvider, public navCtrl: NavController, public navParams: NavParams) {
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
        var options = new RequestOptions({ headers: headers, params: { 'product_id': this.data } });
        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {
            return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        } else { this.apip.apicall(method, url, {}, { 'product_id': this.data }, this.detailsCallback); }

    }
    detailsCallback(response) {
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);

            console.log(a);
            console.log(response);


        }
        else {
            var a = JSON.parse(response.data);
            console.log("asdasd");
            console.log(response.data);
            // console.log(JSON.parse(response.data).data.access_token)
            //     // // console.log(JSON.parse(response.data.access_token));
            //     // console.log(JSON.parse(response.data.data));
            //     // console.log(JSON.parse(response.data.data.access_token));
            //     // console.log(JSON.parse(a.data))
            //     // // console.log(JSON.parse(a.data.access_token));
            //     // // console.log("json" + response.data.access_token.JSON);

            //     // console.log(a.data.access_token);
            //     // console.log(a.headers.data.access_token);
        };
        if (a.status == 200) {
            console.log("asda", a.data);
            // this.navCtrl.setRoot(LoaderPage);
            this.details = a.data;
            this.links = a.data.product_images;
            this.title = a.data.name;
            this.vendor = a.data.producer;
            this.price = a.data.cost;
            this.rating = a.data.rating;
            // this.id1 = a.data.product_images;
            this.description = a.data.description;

            this.link1 = a.data.product_images[0].image;
            console.log("aaaa", this.link1);
            // console.log(a.data.product_images[0].image);
            this.link2 = a.data.product_images[1].image;
            this.link3 = a.data.product_images[2].image;
            this.link4 = a.data.product_images[3].image;
            // this.category = a.data.;


            console.log(this.title);
            // setTimeout(() => {
            //     document.getElementById('title').innerHTML = "asd";
            // }, 0);
            // document.getElementById('title').innerText = "asd";


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


    };
    pic(id) {
        var a;
        if (id == "1") {
            a = this.link1;
            this.link1 = this.link2;
            this.link2 = a;
        } else {
            if (id == "2") {
                a = this.link1;
                this.link1 = this.link3;
                this.link3 = a;
            } else {
                if (id == "3") {
                    a = this.link1;
                    this.link1 = this.link4;
                    this.link4 = a;
                }
            }
        }

    }

}

