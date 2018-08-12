import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AlerttProvider } from '../../providers/alertt/alertt';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { UrlProvider } from '../../providers/url/url';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {
    public first_name: any;
    public last_name: any;
    public email: any;
    public pass: any;
    public pass1: any;
    public mobile: any;
    public gender: any;
    public emailpattern: any = /^[a-zA-Z]\w+([\.-]?\w+)*@\w+([\.-]?\w+){1}(\.\w{2,3})$/;
    public phonepattern: any = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;
    public passpattern: any = /^[A-Za-z]+$/;
    public namepattern: any = /^[a-zA-ZÀ-ÿ]+$/;
    public nopattern: any = /^[0-9]+$/;

    public mess: any;

    constructor(public navCtrl: NavController, public apip: ApiintegrateProvider, public alertp: AlerttProvider, public navParams: NavParams, public alertcontroller: AlertController, public url: UrlProvider) {
        this.registerCallback = this.registerCallback.bind(this);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

    registerCallback(response) {
        console.log(response._body);
        var a = JSON.parse(response._body);
        console.log(a);
        console.log(a.status);

        if (a.status == 200) {
            console.log(a.status);
            this.navCtrl.setRoot(HomePage);
            console.log(a.status);

        } else {
            console.log(a.statusText);

            this.alertp.presentAlert(a.statusText);
        }

    }
    validate() {
        console.log(this.gender);

        this.mess = "";

        var data = new FormData();

        data.append('first_name', this.first_name);
        data.append('last_name', this.last_name);
        data.append('email', this.email);
        data.append('password', this.pass);
        data.append('confirm_password', this.pass1);
        data.append('gender', this.gender);
        data.append('phone_no', this.mobile);



        if (this.first_name == undefined || this.first_name == "") {
            this.mess = "first name cant be empty";
            this.alertp.presentAlert(this.mess);
        }

        else {
            if (!(this.first_name.match(this.namepattern))) {
                this.mess = "invalid name";
                this.alertp.presentAlert(this.mess);

            } else {
                if (this.last_name == undefined || this.last_name == "") {
                    this.mess = "last name cant be empty"; this.alertp.presentAlert(this.mess);
                }
                else {
                    if (!(this.last_name.match(this.namepattern))) {
                        this.mess = "invalid name"; this.alertp.presentAlert(this.mess);
                    } else {
                        if (this.email == undefined || this.email == "") {
                            this.mess = "email name cant be empty"; this.alertp.presentAlert(this.mess);
                        }
                        else {
                            if (!(this.email.match(this.emailpattern))) {
                                this.mess = "invalid email"; this.alertp.presentAlert(this.mess);
                            } else {
                                if (this.pass == undefined || this.pass == "") {
                                    this.mess = "password cant be empty"; this.alertp.presentAlert(this.mess);
                                } else {
                                    if (!(this.pass.match(this.passpattern))) {
                                        this.mess = "password should not contain numerics and special symbols"; this.alertp.presentAlert(this.mess);
                                    } else {
                                        if (this.pass1 == undefined || this.pass1 == "") {
                                            this.mess = "password can not be empty"; this.alertp.presentAlert(this.mess);
                                        } else {
                                            if (!(this.pass1.match(this.pass))) {
                                                this.mess = "passwords dont match"; this.alertp.presentAlert(this.mess);;
                                            } else {
                                                if (this.mobile == undefined || this.mobile == "") {
                                                    this.mess = "mobile number cant be empty"; this.alertp.presentAlert(this.mess);
                                                } else {
                                                    if (!(this.mobile.match(this.phonepattern))) {
                                                        this.mess = "invalid number"; this.alertp.presentAlert(this.mess);

                                                    } else {

                                                        this.alertp.presentAlert(this.mess);
                                                        var method = "post";
                                                        var url = this.url.register;
                                                        console.log(data);
                                                        this.apip.apicall(method, url, data, this.registerCallback);
                                                        console.log(data);





                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };


}