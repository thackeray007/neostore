import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, ModalController } from 'ionic-angular';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';

/**
 * Generated class for the ModalratePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-modalrate',
    templateUrl: 'modalrate.html',
})
export class ModalratePage {

    title: any;
    image: any;
    id: any;
    token: any;
    public data: any;
    constructor(public viewcontroller: ViewController, public url: UrlProvider, public apip: ApiintegrateProvider, public platform: Platform, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalbuyPage');
        this.title = this.navParams.get('title');
        this.image = this.navParams.get('pic');
        this.id = this.navParams.get('id');
        console.log(this.title);
        console.log(this.image);
        console.log(this.id);
        this.token = localStorage.getItem("access_token");

    }

    addtocart() {

        var method = "post";
        var url = this.url.add;
        console.log(this.data);
        var field = new Headers({ "access_token": JSON.stringify(this.token) });

        console.log(field);
        this.addCallback = this.addCallback.bind(this);
        var options = new RequestOptions({ headers: field, params: { product_id: "1", quantity: "1" } });
        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        const data: Object = { product_id: "1", quantity: "1" };
        if (this.platform.is('mobileweb')) {
            // return this.apip.apicall(method, url, options, options, this.addCallback);
            return this.apip.apicall(method, url, data, '', this.addCallback)
        } else {
            // this.apip.apicall(method, url, headers, { product_id: 1, quantity: 1 }, this.addCallback);
        }



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
        // // console.log(data);

    }
    addCallback(response) {
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
            this.viewcontroller.dismiss();
            console.log(a.status);
            0
        } else {
            console.log(a.statusText);

            // this.alertp.presentAlert(a.statusText);
        }

    }



}
