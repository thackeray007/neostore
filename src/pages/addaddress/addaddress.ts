import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlerttProvider } from '../../providers/alertt/alertt';
import { AddresslistPage } from '../addresslist/addresslist';

/**
 * Generated class for the AddaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-addaddress',
    templateUrl: 'addaddress.html',
})
export class AddaddressPage {
    address: any;
    landmark: any;
    city: any;
    state: any;
    zip: any;
    country: any;
    address1 = "Address";
    landmark1 = "Landmark";
    city1 = "City";
    state1 = "State";
    zip1 = "zip";
    country1 = "Country";
    add: any;
    local: any = [];
    data: any;
    index: any;
    total: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertp: AlerttProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddaddressPage');
        this.data = (this.navParams.get('address'));
        this.index = (this.navParams.get('i'));
        console.log("i", this.index);
        this.total = this.navParams.get("total");
        console.log("total", this.total);


        console.log(this.data);
        if (this.data != undefined) {
            this.address = this.data.address;
            this.landmark = this.data.landmark;
            this.city = this.data.city;
            this.state = this.data.state;
            this.zip = this.data.zip;
            this.country = this.data.country;
        }

    }
    save() {
        if (this.address == null || this.address == "") {
            this.alertp.presentAlert("address cant be blank");
        } else {
            if (this.landmark == null || this.landmark == "") {
                this.alertp.presentAlert("landmark cant be blank");
            } else {
                if (this.city == null || this.city == "") {
                    this.alertp.presentAlert("landmark cant be blank");
                } else {
                    if (this.state == null || this.state == "") {
                        this.alertp.presentAlert("landmark cant be blank");
                    } else {
                        if (this.zip == null || this.zip == "") {
                            this.alertp.presentAlert("landmark cant be blank");
                        } else {
                            if (this.country == "" || this.country == null) {
                                this.alertp.presentAlert("landmark cant be blank");
                            } else {
                                this.local = (JSON.parse(localStorage.getItem("address")));
                                console.log(this.local);
                                // console.log(JSON.parse(this.local));
                                // if (this.local == null) {
                                //     this.add = this.address;
                                //     localStorage.setItem("address", (this.add));
                                // } else {
                                //     this.add = { address: this.address, landmark: this.landmark, city: this.city, state: this.state, zip: this.zip, country: this.country };
                                //     this.local = this.local.concat((this.address))
                                //     localStorage.setItem("address", this.local);
                                //     this.navCtrl.setRoot(AddresslistPage);
                                //     console.log(JSON.parse(this.local));
                                // }
                                if (this.local == null) {
                                    this.add = [{ address: this.address, landmark: this.landmark, city: this.city, state: this.state, zip: this.zip, country: this.country }];

                                    // this.add = { 'address': this.address, 'landmark': this.landmark, 'city': this.city, 'state': this.state, 'zip': this.zip, 'country': this.country };
                                    localStorage.setItem("address", JSON.stringify(this.add));
                                    this.navCtrl.setRoot(AddresslistPage);
                                } else {
                                    if (this.index == undefined) {
                                        console.log(this.local);

                                        this.add = { address: this.address, landmark: this.landmark, city: this.city, state: this.state, zip: this.zip, country: this.country };

                                        // this.add = { 'address': this.address, 'landmark': this.landmark, 'city': this.city, 'state': this.state, 'zip': this.zip, 'country': this.country };
                                        this.local.push(this.add);
                                        localStorage.setItem("address", JSON.stringify(this.local));
                                        this.navCtrl.push(AddresslistPage, { total: this.total });

                                        // this.navCtrl.push(AddresslistPage);
                                        // console.log(JSON.parse(this.local));
                                    } else {
                                        this.local[this.index] = { address: this.address, landmark: this.landmark, city: this.city, state: this.state, zip: this.zip, country: this.country };
                                        localStorage.setItem("address", JSON.stringify(this.local));
                                        this.navCtrl.push(AddresslistPage, { total: this.total });

                                    }
                                }
                                // this.add = { address: this.address, landmark: this.landmark, city: this.city, state: this.state, zip: this.zip, country: this.country };
                                // this.local = this.local.concat(JSON.stringify(this.add))
                                // localStorage.setItem("address", this.address);
                                // console.log((this.add).JSON);
                            }
                        }
                    }
                }
            }
        }
    }

}