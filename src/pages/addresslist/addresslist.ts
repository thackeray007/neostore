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
    name = "shubham thackeray";

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.getData();
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AddresslistPage');
        this.getData();
    }
    getData() {
        this.address = JSON.parse(localStorage.getItem("address"));
        console.log(this.address);
        // console.log(JSON.parse(address));
        // console.log(JSON.stringify(this.address));

    }
}
