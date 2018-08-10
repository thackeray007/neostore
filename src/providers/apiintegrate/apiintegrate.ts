//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { AlerttProvider } from '../alertt/alertt';
import { NeostorePage } from '../../pages/neostore/neostore';



//import{ HTTP } from '@ionic-native/http';
/*
  Generated class for the ApiintegrateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiintegrateProvider {
    s1: Observable<any>;

    constructor(public http: Http, public alertp: AlerttProvider) {
        console.log('Hello ApiintegrateProvider Provider');
    }


    apicall(method, url, data, callback) {

        if (method == 'post') {
            this.http.post(url, data).subscribe(data => {
                callback(data);
            }, error => {
                console.log(error);
            });
        } else {
            if (method == 'get') {

                this.s1 = this.http.get(url);
                this.s1
                    .subscribe(data => {
                        console.log("my data", data);

                    })
            }
        }

    }


}
