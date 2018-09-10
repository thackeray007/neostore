import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '../../../node_modules/@ionic-native/stripe';
// import { Http } from '../../../node_modules/@angular/http';
import { Headers, Http } from '../../../node_modules/@angular/http';
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
    cardinfo: any = {
        number: 4242424242424242,
        expMonth: 12,
        expYear: 2020,
        cvc: 220
    }
    constructor(public navCtrl: NavController, public navParams: NavParams, public stripe: Stripe, public http: Http) {
        // this.stripe.setPublishableKey('pk_test_d0jG9KYWiro7NC1jHwJeimun');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CardPage');
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
        this.stripe.createCardToken(this.cardinfo).then((token) => {
            console.log("token generator", token);

            var data = JSON.stringify(token.id);
            var headers = new Headers();
            headers.append('Conent-Type', 'application/x-www-form-urlencoded');
            this.http.post('http://192.168.2.1:3333/processpay', data, { headers: headers }).subscribe((res) => {
                console.log(res);

                if (res.json().success)
                    alert('transaction Successfull!!')
            })
        })
    }
}
