import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ModalController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
import { ModalbuyPage } from '../../pages/modalbuy/modalbuy'
import { ModalratePage } from '../modalrate/modalrate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AlerttProvider } from '../../providers/alertt/alertt';
/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-product-details',
    templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
    public data: any;
    public details: any;
    title: any;
    vendor: any;
    category: any;
    price: any;
    rating: any;
    links: any;
    link1: any;
    link2: any;
    link3: any;
    link4: any;
    description: any;
    id: any;
    data1: any;
    constructor(public modalCtrl: ModalController, public alertCtrl: AlertController, public platform: Platform, public url: UrlProvider, public apip: ApiintegrateProvider, public navCtrl: NavController, public navParams: NavParams, public socialshare: SocialSharing, public alert: AlerttProvider) {
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad ProductDetailsPage');
        // this.data = JSON.stringify(this.navParams.get('id'));
        this.data = JSON.stringify(this.navParams.get('id'));
        this.data1 = (this.navParams.get('title'));
        this.id = this.navParams.get('id');
        console.log("data" + this.data);

        this.getdata();
    }
    getdata() {
        this.alert.presentLoadingDefault('Product Details being Fetched...');

        var method = "get";
        var url = this.url.details;
        console.log(this.data);
        var headers = new Headers({});

        console.log(headers);
        this.detailsCallback = this.detailsCallback.bind(this);
        var options = new RequestOptions({ headers: headers, params: { 'product_id': this.data } });
        // return this.apip.apicall(method, url, options, { 'product_id': "1" }, this.detailsCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {
            return this.apip.apicall(method, url, options, {}, this.detailsCallback);
        } else { this.apip.apicall(method, url, {}, { 'product_id': this.data }, this.detailsCallback); }

    }
    detailsCallback(response) {
        setTimeout(() => {
            this.alert.loading.dismiss();
        }, 0);
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);

            console.log(a);
            console.log(response);


        }
        else {
            var a = JSON.parse(response.data);
            console.log("asdasd");
            console.log(response.data);

            //comments to check the response


            // console.log(JSON.parse(response.data).data.access_token)
            //     // // console.log(JSON.parse(response.data.access_token));
            //     // console.log(JSON.parse(response.data.data));
            //     // console.log(JSON.parse(response.data.data.access_token));
            //     // console.log(JSON.parse(a.data))
            //     // // console.log(JSON.parse(a.data.access_token));
            //     // // console.log("json" + response.data.access_token.JSON);

            //     // console.log(a.data.access_token);
            //     // console.log(a.headers.data.access_token);
        };
        if (a.status == 200) {
            console.log("asda", a.data);
            // this.navCtrl.setRoot(LoaderPage);
            this.details = a.data;
            this.links = a.data.product_images;
            this.title = a.data.name;
            this.vendor = a.data.producer;
            this.price = a.data.cost;
            this.rating = a.data.rating;
            // this.id1 = a.data.product_images;
            this.description = a.data.description;

            this.link1 = a.data.product_images[0].image;
            console.log("aaaa", this.link1);
            // console.log(a.data.product_images[0].image);

            // this.category = a.data.;


            console.log(this.title);
            // setTimeout(() => {
            //     document.getElementById('title').innerHTML = "asd";
            // }, 0);
            // document.getElementById('title').innerText = "asd";


            console.log(this.vendor);
            console.log(this.category);
            console.log("final");




            // this.rating = this.abcd.rating;
            // this.abcd = a.data;
            console.log("asdasdasd", this.details);
            // this.abcd = a.data;
            console.log("asd" + this.details);

        } else {
            console.log(a.statusText);

            // this.alertp.presentAlert(a.statusText);
        }


    };

    pic1(image) {
        this.link1 = image;
    }

    buy() {
        this.presentProfileModal1();
        // this.presentPrompt(this.data);
    }
    rate() {
        this.presentProfileModal2();
    }
    presentPrompt(id) {
        let alert = this.alertCtrl.create({
            title: this.title,

            inputs: [
                {
                    name: 'Enter Quentity',
                    placeholder: 'enter quentity'
                }
            ],
            buttons: [
                {
                    text: 'submit',
                    role: 'submit',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                // {
                //   text: 'Login',
                //   handler: data => {
                //     if (User.isValid(data.username, data.password)) {
                //       // logged in!
                //     } else {
                //       // invalid login
                //       return false;
                //     }
                //   }
                // }
            ]
        });
        alert.present();
    }
    presentProfileModal1() {
        let profileModal = this.modalCtrl.create(ModalbuyPage, { id: this.id, title: this.title, pic: this.link1 }, { cssClass: "my-modal" });
        profileModal.present();
    }
    presentProfileModal2() {
        let profileModal = this.modalCtrl.create(ModalratePage, { id: this.id, title: this.title, pic: this.link1, rating: this.rating }, { cssClass: "my-modal", enableBackdropDismiss: true });
        profileModal.present();
    }
    share() {
        this.socialshare.share("Ae Mavshi", "subject", "image", "url").then(() => {
            // Sharing via email is possible
            console.log("success");

        }).catch(() => {
            // Sharing via email is not possible
            console.log("fail");

        });

    }
}

