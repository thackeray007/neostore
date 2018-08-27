import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
/**
 * Generated class for the MycartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-mycart',
    templateUrl: 'mycart.html',
})
export class MycartPage {
    data: any;
    token: any;
    abcd: any;
    total: any;
    constructor(public platform: Platform, public url: UrlProvider, public apip: ApiintegrateProvider, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MycartPage');
        this.token = localStorage.getItem("access_token");
        console.log(this.token);

        this.postdata();
    }
    postdata() {

        var method = "get";
        var url = this.url.cart;
        console.log(this.data);
        var headers = new Headers({ 'access_token': this.token, 'Access-Control-Allow-Headers': 'X-Custom-Header' });
        // var headers = new Headers({ 'access_token': this.token, 'Access-Control-Allow-Headers': 'X-Custom-Header' });
        var options = new RequestOptions({ headers: headers })

        console.log("headeresw", headers);
        this.cartCallback = this.cartCallback.bind(this);

        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {

            return this.apip.apicall(method, url, { headers: headers }, {}, this.cartCallback);
        } else { this.apip.apicall(method, url, { 'access_token': this.token }, {}, this.cartCallback); }
    }
    cartCallback(response) {
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

            console.log("asda", a.data);
            this.abcd = a.data;
            console.log("data", this.abcd);
            this.total = a.total;

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
    delete(id) {
        console.log(id);
        var method = "post";
        var url = this.url.deleteCart;

        var headers = new Headers({ 'access_token': this.token });
        this.deleteCallback = this.deleteCallback.bind(this);
        console.log(headers);
        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {
            var data = new FormData();
            data.append('product_id', id);
            return this.apip.apicall(method, url, data, { headers: headers }, this.deleteCallback);
        } else { this.apip.apicall(method, url, { 'product_id': id }, { 'access_token': this.token }, this.deleteCallback); }

    }
    deleteCallback(response) {
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);



        }
        else {
            var a = JSON.parse(response.data);


        };

        if (a.status == 200) {
            console.log(response);
            this.postdata();


        } else {
            console.log(a.statusText);


        }

    }







}




