import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { UrlProvider } from '../../providers/url/url';
import { AlerttProvider } from '../../providers/alertt/alertt';
import { NeostorePage } from '../neostore/neostore';
// import { RequestOptions } from '../../../node_modules/@angular/http';
import { RequestOptions, Headers } from '@angular/http';
import { HomePage } from '../home/home';


/**
 * Generated class for the LoaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-loader',
    templateUrl: 'loader.html',
})
export class LoaderPage {

    constructor(public alertp: AlerttProvider, public platform: Platform, public navCtrl: NavController, public url: UrlProvider, public apip: ApiintegrateProvider, public navParams: NavParams) {
        this.loaderCallback = this.loaderCallback.bind(this);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoaderPage');
        var data1 = localStorage.getItem("access_token");
        // if (data1 == undefined) {
        //     localStorage.setItem("aceess_token", "");
        // }
        var method = "get";
        var url = this.url.loader;
        console.log(data1);
        //  var data = data1;
        console.log("before get fn");
        // console.log(data);
        var headers = new Headers({ 'access_token': data1, 'Access-Control-Allow-Headers': 'X-Custom-Header' });
        // headers.append('access_token', data);
        console.log(headers);

        var options = new RequestOptions({ headers: headers });
        console.log(options);

        // var headers = new Headers({ 'access_token': data1, 'Access-Control-Allow-Headers': 'X-Custom-Header' });
        // // headers.append('access_token', data);
        // console.log(headers);

        // var options = new RequestOptions({ headers : headers });
        // console.log(options);

        // if (this.platform.is('mobileweb')) {
        //     data = new FormData();

        //     console.log(typeof (data1));

        // }
        // else {
        //     data = { 'access_token': data1 };
        // };
        this.apip.apicall(method, url, options, this.loaderCallback);
        // console.log(data);

    }

    loaderCallback(response) {
        console.log("loader" + response);
        // console.log(JSON.parse(response));
        console.log(response);
        // console.log(response.JSON);


        if (this.platform.is('mobileweb')) {
            console.log(JSON.stringify(response));
            console.log(response);

            // var a = JSON.parse(response._body)
            // console.log(response._body);

        }
        else {
            var a = JSON.parse(response);
            console.log("a" + a);
        };
        console.log(response);
        console.log(a.status);

        if (a.status == 200) {
            // console.log(a.status);
            this.navCtrl.setRoot(NeostorePage);
            // console.log(a.status);

        } else {
            // console.log(a.statusText);
            this.navCtrl.setRoot(HomePage);

        }

    }
}


