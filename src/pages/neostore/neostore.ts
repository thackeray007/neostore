import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slide, Platform, MenuController, AlertController, ToastController } from 'ionic-angular';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
import { toObservable } from '../../../node_modules/@angular/forms/src/validators';
import { UrlProvider } from '../../providers/url/url';
import { ProductsPage } from '../products/products';

/**
 * Generated class for the NeostorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-neostore',
    templateUrl: 'neostore.html',
})
export class NeostorePage {
    public products: any;
    public images: any = [];
    data: any;
    counter = 0;
    constructor(public url: UrlProvider, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public apip: ApiintegrateProvider, public menuCtrl: MenuController, public alertCtrl: AlertController, public toast: ToastController) {

        this.data = localStorage.getItem("userDetails");
        console.log("important", this.data);



        platform.registerBackButtonAction(() => {
            if (this.counter == 0) {
                if (navCtrl.canGoBack()) {
                    navCtrl.pop();
                } else {
                    this.counter++;
                    this.presentToast();
                    setTimeout(() => { this.counter = 0 }, 3000)
                }
            } else {
                // console.log("exitapp");
                platform.exitApp();
            }
        }, 0);
    }

    @ViewChild(Slides) slides: Slides;
    //this.slides.slideto(2,500);
    // ionViewDidEnter() {
    //     this.menuCtrl.enable(true, "hamburger-menu");
    // }
    ionViewDidLoad() {
        // console.log('ionViewDidLoad NeostorePage');
        // var url="http://staging.php-dev.in:8844/trainingapp/api/products/getList";
        // var method="get";
        // var data=this.apip.apicall(method,url,{},{});
        // console.log(data);

        this.slider_pics();
        // this.menuCtrl.enable(true, "hamburger-menu");
    }

    slider_pics() {
        var url = this.url.userDetails;
        var method = "get";
        var data = "";
        var data1 = localStorage.getItem("access_token");
        var headers = new Headers({ 'access_token': data1, 'Access-Control-Allow-Headers': 'X-Custom-Header' });
        var options = new RequestOptions({ headers: headers });
        this.slider_callback = this.slider_callback.bind(this);
        if (this.platform.is('mobileweb')) {
            this.apip.apicall(method, url, options, {}, this.slider_callback);
        } else { this.apip.apicall(method, url, { 'access_token': data1 }, {}, this.slider_callback); }

    }
    slider_callback(response) {
        console.log("loader" + response);

        if (this.platform.is('mobileweb')) {
            this.images = JSON.parse(response._body).data.product_categories;
            console.log("a" + this.images);
            localStorage.setItem("userDetails", response._body);
        }
        else {
            var a = JSON.parse(response.data);
            console.log("a" + a);
            this.images = a.data.product_categories;
            localStorage.setItem("userDetails", response.data);
        };
        console.log("a" + a);
        console.log(a);

        // if (a.status == 200) {

        // } else {
        //     console.log(a.statusText);


        // }





    }
    table(abcd) {
        this.navCtrl.push(ProductsPage, {
            id: abcd
        })
        // this.postdata(data);
    }
    presentToast() {
        let toast = this.toast.create({
            message: 'Press again to exit',
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }
}
