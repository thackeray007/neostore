import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';


/**
 * Generated class for the ModalbuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-modalbuy',
    templateUrl: 'modalbuy.html',
})
export class ModalbuyPage {
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
        console.log(this.token);


    }

    addtocart() {

        var method = "post";
        var url = this.url.add;
        console.log(this.data);
        var headers = new Headers({ 'access_token': this.token });

        console.log(headers);
        this.addCallback = this.addCallback.bind(this);
        var options = new RequestOptions({ headers: headers, params: data });
        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {
            var data = new FormData();
            data.append('product_id', this.id);
            data.append('quantity', '1');
            return this.apip.apicall(method, url, data, { headers: headers }, this.addCallback);
        } else { this.apip.apicall(method, url, { 'product_id': '1', 'quantity': '1' }, { 'access_token': this.token }, this.addCallback); }



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
            this.viewcontroller.dismiss();
            console.log(a.status);
            0
        } else {
            console.log(a.statusText);
            console.log("fail in callback");


            // this.alertp.presentAlert(a.statusText);
        }

    }


}

