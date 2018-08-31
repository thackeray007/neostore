import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-my-account',
    templateUrl: 'my-account.html',
    providers: [ImagePicker],
})
export class MyAccountPage {
    data: any;
    f_name: any;
    l_name: any;
    number: any;
    dob: any;
    dp: any;
    email: any;
    pickedImage: any;
    buttonStatus = "Edit profile";
    constructor(public navCtrl: NavController, public navParams: NavParams, public imagepic: ImagePicker, public imageoptions: ImagePickerOptions) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyAccountPage');
        this.getData();
    }
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
    picker() {
        let options;
        //this.pickedImage="assets/imgs/logo.png";
        // this.showLoading();
        this.imagepic.getPictures(options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, (err) => {
            console.log("error");
        });
    }

}
