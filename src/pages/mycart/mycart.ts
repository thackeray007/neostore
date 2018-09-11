import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, AlertController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
import { AddaddressPage } from '../addaddress/addaddress';
import { AddresslistPage } from '../addresslist/addresslist';
import { AlerttProvider } from '../../providers/alertt/alertt';
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
    total = 0;
    itemss: any;
    a: any;
    cart_items: any;
    constructor(public platform: Platform, public url: UrlProvider, public apip: ApiintegrateProvider, public navCtrl: NavController, public navParams: NavParams, public events: Events, public alertCtrl: AlertController, public alert: AlerttProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MycartPage');
        this.token = localStorage.getItem("access_token");
        console.log(this.token);

        this.postdata();
    }
    postdata() {
        this.alert.presentLoadingDefault('list being prepared');

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
        setTimeout(() => {
            this.alert.loading.dismiss();
        }, 0);
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
            if (a.count != undefined) { this.cart_items = a.count; }
            else { this.cart_items = 0; }
            this.events.publish('cart:cart', this.cart_items);

            // if (a.data == "null") {
            //     a = true;
            // } else { a = false };
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
        this.presentConfirm(id);
    }
    delete1(id) {
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

    orderNow() {
        if (this.cart_items == 0) {
            this.alert.presentAlertt("oHhhooo_", "add something to your cart_");
        } else {
            console.log("ordered");
            this.navCtrl.push(AddresslistPage)
        }

    }

    changed(id, itemss) {
        console.log(id);
        console.log(itemss);


    }
    onSelectChange(selectedValue: any, id) {
        console.log('Selected', selectedValue);
        console.log(id);

        console.log(selectedValue);

        var method = "post";
        var url = this.url.edit;
        console.log(this.data);
        var headers = new Headers({ 'access_token': this.token });

        console.log(headers);
        this.editCallback = this.editCallback.bind(this);

        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {
            var data = new FormData();
            data.append('product_id', id);
            data.append('quantity', selectedValue);
            return this.apip.apicall(method, url, data, { headers: headers }, this.editCallback);
        } else { this.apip.apicall(method, url, { 'product_id': id, 'quantity': selectedValue }, { 'access_token': this.token }, this.editCallback); }
    }

    editCallback(response) {
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);

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

        };
        console.log(a);
        console.log(a.status);

        if (a.status == 200) {
            console.log(a.status);

            console.log(a.status);

        } else {
            console.log(a.statusText);
            console.log("fail in callback");


            // this.alertp.presentAlert(a.statusText);
        }

    }

    presentConfirm(id) {
        let alert = this.alertCtrl.create({
            title: 'Remove',
            message: 'Do you really want to delete this from your Cart',
            buttons: [
                {
                    text: 'NO',
                    role: 'NO',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.delete1(id);
                        console.log('Buy clicked');
                    }
                }
            ]
        });
        alert.present();
    }



}




