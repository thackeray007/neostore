import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';


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
    buttonStatus = "Edit profile";
    constructor(public navCtrl: NavController, public navParams: NavParams, public imagepic: ImagePicker, private camera: Camera, public actionsheetCtrl: ActionSheetController, private date: DatePicker) {
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
    select() {

        this.presentActionSheet();

    }
    picker() {
        let options;
        //this.pickedImage="assets/imgs/logo.png";
        // this.showLoading();
        this.imagepic.getPictures(options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                this.pickedImage = results[i];
            }
        }, (err) => {
            console.log("error");
        });
    };
    cam() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.pickedImage = base64Image;
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
    datePicker() {
        this.date.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.date.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
            date => {
                console.log('Got date: ', date)
                this.dob = date;
            },
            err => console.log('Error occurred while getting date: ', err)
        );

    }

}

