import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';

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
    token: any;
    buttonStatus = "Edit profile";
    constructor(public navCtrl: NavController, public navParams: NavParams, public imagepic: ImagePicker, private camera: Camera, public actionsheetCtrl: ActionSheetController, private date: DatePicker, public platform: Platform, public url: UrlProvider, public apip: ApiintegrateProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyAccountPage');
        this.getData();
        this.token = localStorage.getItem("access_token");
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
        this.dob = new Date(this.data.data.user_data.dob).toISOString();
        console.log("DOB-", this.dob);

    }
    select() {

        this.presentActionSheet();

    }
    picker() {
        let options =
        {
            maximumImagesCount: 3,
            quality: 90,
            outputType: 1
        };
        //this.pickedImage="assets/imgs/logo.png";
        // this.showLoading();
        this.imagepic.getPictures(options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                let base64Image = 'data:image/jpeg;base64,' + results[i];
                console.log('may be here ', base64Image);
                this.dp = base64Image;
            }
        }, (err) => {
            console.log("error");
        });
    };
    cam() {
        const options: CameraOptions = {
            quality: 10,
            // destinationType: this.camera.DestinationType.FILE_URI,
            destinationType: 0,
            sourceType: 1,
            encodingType: this.camera.EncodingType.JPEG,
            // mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            console.log("imagedata", imageData);

            let base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log("error key", base64Image);

            this.dp = base64Image;
        }, (err) => {
            // Handle error
        });
    }
    presentActionSheet() {
        let actionSheet = this.actionsheetCtrl.create({
            title: 'Upload an Image',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    role: 'destructive',
                    handler: () => {
                        console.log('camera clicked');
                        this.cam();
                    }
                },
                {
                    text: 'Gallery',
                    icon: 'images',
                    handler: () => {
                        console.log('Archive clicked');
                        this.picker();
                    }
                },

            ]
        });

        actionSheet.present();
    }
    // datePicker() {
    //     this.date.show({
    //         date: new Date(),
    //         mode: 'date',
    //         androidTheme: this.date.ANDROID_THEMES.THEME_HOLO_DARK
    //     }).then(
    //         date => {
    //             console.log('Got date: ', date)
    //             this.dob = date;
    //         },
    //         err => console.log('Error occurred while getting date: ', err)
    //     );

    // }
    editProfile() {
        console.log(this.f_name);
        console.log(this.l_name);
        console.log(this.email);
        console.log(this.dob);
        console.log(this.dp);
        var method = "post";
        var url = this.url.update;
        console.log(this.data);
        var headers = new Headers({ 'access_token': this.token });

        console.log(headers);
        this.profileCallback = this.profileCallback.bind(this);

        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {
            var data = new FormData();
            data.append('first_name', this.f_name);
            data.append('last_name', this.l_name);
            data.append('email', this.email);
            data.append('dob', this.dob);
            data.append('phone_no', this.number);
            data.append('profile_pic', this.dp);
            this.token = localStorage.getItem("access_token");
            return this.apip.apicall(method, url, data, { headers: headers }, this.profileCallback);
        } else { this.apip.apicall(method, url, { 'first_name': this.f_name, 'last_name': this.l_name, 'email': this.email, 'dob': this.dob, 'phone_no': this.number, 'profile_pic': this.dp }, { 'access_token': this.token }, this.profileCallback); }



        // if (this.platform.is('mobileweb')) {
        //     this.data = new FormData();
        //     this.data.append('access_token', this.token);

        // }
        // else {
        //     this.data = { 'access_token': this.token };
        // };

        // var method = "post";
        // var url = this.url.add;
        // console.log(this.data);
        // this.apip.apicall(method, url, this.data, {}, this.addCallback);
        // // console.log(data);

    }

    profileCallback(response) {
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);

            console.log(a.data.access_token);

        }
        else {
            var a = (response);
            console.log("asdasd");

            console.log(response.data);

            console.log(JSON.parse(response.data).data.access_token)
            // // console.log(JSON.parse(response.data.access_token));
            // console.log(JSON.parse(response.data.data));
            // console.log(JSON.parse(response.data.data.access_token));
            // console.log(JSON.parse(a.data))
            // // console.log(JSON.parse(a.data.access_token));
            // // console.log("json" + response.data.access_token.JSON);


            // console.log(a.data.access_token);
            // console.log(a.headers.data.access_token);

        };
        console.log(a);
        console.log(a.status);

        if (a.status == 200) {
            console.log(a.status);

            console.log(a.status);

        } else {
            console.log(a.statusText);
            console.log("fail in callback");
            // this.alertp.presentAlert("only upto 8 items are deliverable")

            // this.alertp.presentAlert(a.statusText);
        }

    }

}

