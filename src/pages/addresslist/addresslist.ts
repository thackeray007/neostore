import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { getScrollData } from '../../../node_modules/ionic-angular/umd/components/input/input';
import { AddaddressPage } from '../addaddress/addaddress';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { UrlProvider } from '../../providers/url/url';
import { AlerttProvider } from '../../providers/alertt/alertt';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
import { CardPage } from '../card/card';
/**
 * Generated class for the AddresslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-addresslist',
    templateUrl: 'addresslist.html',
})
export class AddresslistPage {
    address: any;
    name: any;
    user_details: any;
    token: any;
    address1: any;
    address2: any;
    index1: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public apip: ApiintegrateProvider, public url: UrlProvider, public alertp: AlerttProvider) {
        this.getData();
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AddresslistPage');
        this.getData();
        this.token = localStorage.getItem("access_token");
    }
    getData() {
        this.address = JSON.parse(localStorage.getItem("address"));
        console.log(this.address);
        this.user_details = localStorage.getItem("userDetails");
        this.name = JSON.parse(this.user_details).data.user_data.first_name + " " + JSON.parse(this.user_details).data.user_data.last_name;

        console.log("name", this.name);



        // console.log(JSON.parse(address));
        // console.log(JSON.stringify(this.address));
    }
    add() {
        this.navCtrl.push(AddaddressPage);
    };

    placeOrder() {
        if (this.index1 == "" || this.index1 == undefined) {
            this.alertp.presentAlertt("ohhhHo", "please select the address")
        } else {
            this.address2 = this.address[this.index1];
            console.log(this.address);

            this.navCtrl.push(CardPage, { address: this.address2.address + " " + this.address2.landmark + " " + this.address2.city + " " + this.address2.country + " " + this.address2.zip });
        }

    }


    delete(i) {
        console.log(i);

        this.address.splice(i, 1);
        localStorage.setItem("address", JSON.stringify(this.address))
    }
    edit(i) {
        this.navCtrl.push(AddaddressPage, {
            address: this.address[i], i: i
        })

    }
}



