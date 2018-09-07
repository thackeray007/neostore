//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { AlerttProvider } from '../alertt/alertt';
import { NeostorePage } from '../../pages/neostore/neostore';
import { errorHandler } from '../../../node_modules/@angular/platform-browser/src/browser';
import { HTTP } from '@ionic-native/http';
// import { Device } from '@ionic-native/device';
import { Platform, Option, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

//import{ HTTP } from '@ionic-native/http';
/*
  Generated class for the ApiintegrateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiintegrateProvider {
    s1: Observable<any>;
    s2: Observable<any>;
    method: any;
    url: any;
    data: any;
    params: any;

    callback: any;
    constructor(public http: Http, public alertp: AlerttProvider, public HTTP: HTTP, public platform: Platform) {
        console.log('Hello ApiintegrateProvider Provider');
    }


    apicall(method, url, data, params, callback) {
        console.log(this.platform);
        this.method = method;
        this.url = url;
        this.data = data;
        this.params = params;
        this.callback = callback;

        if (this.platform.is('mobileweb')) {
            console.log("sdf");
            this.mobileWeb();
        } else {
            this.devices();
        }
    }


    devices() {
        console.log(this.data);

        if (this.method == 'post') {
            console.log("asdqw");

            this.HTTP.post(this.url, this.data, this.params).then(data => {
                // var a = JSON.parse(data.data);
                this.callback(data);


            }, error => {
                console.log(typeof (error));

                // var a = JSON.stringify(error.error.user_msg);
                //
                // console.log(a);

                this.alertp.presentAlert(error.error);
                // console.log(error);
                // console.log(error.error.user_msg);



            });
        } else {
            if (this.method == 'get') {
                console.log("asd" + typeof (this.data));




                this.HTTP.get(this.url, this.params, this.data)
                    .then(response => {
                        console.log("TEST");
                        //var formattedResponse = JSON.parse(response.data);
                        this.callback(response);
                    }, error => {
                        console.log("GlobalpostwithHeader_service error", error);
                        //var formattedResponse = JSON.parse(error.data);
                        this.callback(error);
                    });

            }




            // if (method == 'get') {

            //     this.HTTP.get(url, {}, data)

            //         .then(data => {
            //             // console.log("my data", data);
            //             return callback(data);

            //         }, error => {
            //             console.log("error bhaie");

            //             // this.navCtrl.setRoot(HomePage);
            //             return callback(error);

            //             // this.alertp.presentAlert("error")
            //         });
            // }

        }


    }
    mobileWeb() {
        if (this.method == 'post') {
            console.log("params", this.params);

            console.log('data :', this.data);
            this.http.post(this.url, this.data, this.params).subscribe(data => {
                this.callback(data);
            }, error => {
                var a = JSON.parse(error._body);
                // console.log(a);

                this.alertp.presentAlert(a.user_msg);
                // console.log(error);
                // var ab = a.access_token;




            });
        } else {


            if (this.method == 'get') {

                this.s1 = this.http.get(this.url, this.data);
                this.s1
                    .subscribe(data => {
                        // console.log("my data", data);
                        return this.callback(data);

                    }, error => {
                        console.log("error bhaie");

                        return this.callback(error);

                        // this.alertp.presentAlert("error")
                    });
            }
        }
    }
}

