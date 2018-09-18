import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Stripe } from '../../../node_modules/@ionic-native/stripe';
// import { Http } from '../../../node_modules/@angular/http';
import { Headers, Http } from '../../../node_modules/@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { AlerttProvider } from '../../providers/alertt/alertt';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { Platform } from '../../../node_modules/ionic-angular/platform/platform';
// import { HTTP } from '../../../node_modules/@ionic-native/http';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-card',
    templateUrl: 'card.html',
})
export class CardPage {
    user_details: any;
    name: any;
    token: any;
    total: any;
    address: any;
    cardinfo: any = {
        number: 4242424242424242,
        expMonth: 12,
        expYear: 2020,
        cvc: 220
    }
    constructor(public navCtrl: NavController, public navParams: NavParams, public stripe: Stripe, public http: Http, public url: UrlProvider, public apip: ApiintegrateProvider, public alertp: AlerttProvider, public platform: Platform, public events: Events) {
        // this.stripe.setPublishableKey('pk_test_d0jG9KYWiro7NC1jHwJeimun');



    }

    ionViewDidLoad() {
        this.address = (this.navParams.get('address'));
        this.user_details = localStorage.getItem("userDetails");
        this.name = JSON.parse(this.user_details).data.user_data.first_name + " " + JSON.parse(this.user_details).data.user_data.last_name; this.token = localStorage.getItem('access_token');
        console.log("address", this.address);
        console.log("token", this.token);
        console.log('ionViewDidLoad CardPage');
        this.total = this.navParams.get("total");
        console.log("total", this.total);

    }


    //test code from stripe.com


    // pay() {
    //     this.stripe.setPublishableKey('pk_test_d0jG9KYWiro7NC1jHwJeimun');

    //     let card = {
    //         number: '4242424242424242',
    //         expMonth: 12,
    //         expYear: 2020,
    //         cvc: '220'
    //     };

    //     this.stripe.createCardToken(card)
    //         .then(token => console.log(token.id))
    //         .catch(error => console.error(error));
    // }
    pay() {
        this.stripe.setPublishableKey('pk_test_d0jG9KYWiro7NC1jHwJeimun');
        this.alertp.presentLoadingDefault("please wait ...payment in process");
        this.stripe.createCardToken(this.cardinfo).then((token) => {
            console.log("token generator", token);

            var data = ({
                'token': token.id, 'amount': this.total, name: this.name
            })

            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            setTimeout(() => {
                this.http.post('http://192.168.2.1:3333/processpay', data, { headers: headers }).subscribe((res) => {
                    console.log(res);
                    var a = res.json().customer;
                    console.log("customer id", a);

                    if (res.json().success) {

                        this.placeOrder();
                    } else {
                        this.alertp.loading.dismiss();
                        this.alertp.presentAlertt("transaction failed!", "try after some time");
                    }

                    // alert('transaction Successfull!!')
                })

            }, 30000);
            this.alertp.loading.dismiss();
        })
    }

    placeOrder() {

        this.alertp.presentLoadingDefault("payment successfull..placing your order");

        var method = "post";
        var url = this.url.order;
        console.log("token", this.token);
        console.log(this.address);

        var headers = new Headers({ 'access_token': this.token });

        console.log(headers);
        this.orderCallback = this.orderCallback.bind(this);

        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {
            var data = new FormData();
            data.append('address', this.address);

            return this.apip.apicall(method, url, data, { headers: headers }, this.orderCallback);
        } else { this.apip.apicall(method, url, { address: this.address }, { 'access_token': this.token }, this.orderCallback); }

    }
    orderCallback(response) {
        this.alertp.loading.dismiss();
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);


            // console.log(a.data.access_token);
        }
        else {
            var a = (response);
            console.log("asdasd");

            console.log(response.data);

            // console.log(JSON.parse(response.data).data.access_token)

        };
        console.log(a);
        console.log(a.status);

        if (a.status == 200) {
            console.log(a.status);
            var mess = a.message;
            var usr_mess = a.user_msg;
            this.alertp.presentAlertt("yooohoo", "your order is placed successfully....");
            console.log(a.status);
            this.events.publish('cart:cart', 0);
        } else {
            console.log(a.statusText);
            console.log("fail in callback");
            this.alertp.presentAlert("something went wrong")

            // this.alertp.presentAlert(a.statusText);
        }


    }
}
