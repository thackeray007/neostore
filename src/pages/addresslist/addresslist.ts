import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getScrollData } from '../../../node_modules/ionic-angular/umd/components/input/input';

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

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.getData();
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AddresslistPage');

    }
    getData() {
        this.address = localStorage.getItem("address");
        console.log(this.address);
        console.log(JSON.stringify(this.address));

    }
}
