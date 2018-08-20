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

    constructor(public http: Http, public alertp: AlerttProvider, public HTTP: HTTP, public platform: Platform) {
        console.log('Hello ApiintegrateProvider Provider');
    }


    apicall(method, url, data, callback) {
        console.log(this.platform);

        if (this.platform.is('mobileweb')) {
            console.log("sdf");



            if (method == 'post') {
                this.http.post(url, data).subscribe(data => {
                    callback(data);
                }, error => {
                    var a = JSON.parse(error._body);
                    console.log(a);

                    this.alertp.presentAlert(a.user_msg);
                    console.log(error);
                    var ab = a.access_tocken;




                });
            } else {


                if (method == 'get') {

                    this.s1 = this.http.get(url, data);
                    this.s1
                        .subscribe(data => {
                            // console.log("my data", data);
                            return callback(data);

                        }, error => {
                            console.log("error bhaie");

                            return callback(error);

                            // this.alertp.presentAlert("error")
                        });
                }
            }

        } else {
            console.log(data);

            if (method == 'post') {
                console.log("asdqw");

                this.HTTP.post(url, data, {}).then(data => {
                    // var a = JSON.parse(data.data);
                    callback(data);


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
                if (method == 'get') {
                    console.log("asd" + typeof (data));




                    this.HTTP.get(url, {}, data)
                        .then(response => {
                            console.log("TEST");
                            //var formattedResponse = JSON.parse(response.data);
                            return callback(response);
                        })
                        .catch(error => {
                            console.log("GlobalpostwithHeader_service error", error);
                            //var formattedResponse = JSON.parse(error.data);
                            return callback(error);
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
    }

}

