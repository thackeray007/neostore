import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { MyAccountPage } from '../my-account/my-account';

/**
 * Generated class for the AccountDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-account-details',
    templateUrl: 'account-details.html',
})
export class AccountDetailsPage {

    data: any;
    f_name: any;
    l_name: any;
    number: any;
    dob: any;
    dp: any;
    email: any;
    pickedImage: any;
    token: any;
    buttonStatus = "Edit profile";
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyAccountPage');
        this.getData();
        this.token = localStorage.getItem("access_token");
        this.events.subscribe('details:updated', (f_name, l_name, email, dob, number, dp) => {
            this.f_name = f_name;

            this.l_name = l_name;
            this.email = email;
            this.number = number;
            this.dp = dp;
            this.dob = dob;

        });
    };
    getData() {
        this.data = JSON.parse(localStorage.getItem("userDetails"));
        console.log("parsed from loocal storage", this.data);

        this.f_name = this.data.data.user_data.first_name;
        console.log("first name", this.f_name);
        this.l_name = this.data.data.user_data.last_name;
        this.email = this.data.data.user_data.email;
        this.number = this.data.data.user_data.phone_no;
        this.dp = this.data.data.user_data.profile_pic;
        this.dob = this.data.data.user_data.dob;

    }
    editProfile() {
        this.navCtrl.push(MyAccountPage);
    }
}
