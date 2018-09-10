import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, ModalController } from 'ionic-angular';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';

/**
 * Generated class for the ModalratePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-modalrate',
    templateUrl: 'modalrate.html',
})
export class ModalratePage {
    rating: any;
    title: any;
    image: any;
    id: any;
    token: any;
    data: any;
    constructor(public viewcontroller: ViewController, public url: UrlProvider, public apip: ApiintegrateProvider, public platform: Platform, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalbuyPage');
        this.id = JSON.stringify(this.navParams.get('id'));
        this.rating = this.navParams.get('rating');
        this.image = this.navParams.get('pic');
        this.title = this.navParams.get('title');
        this.rateCallback = this.rateCallback.bind(this);
    }

    Rating() {

        var method = "post";

        var url = this.url.rate;
        if (this.platform.is('mobileweb')) {
            this.data = new FormData();
            this.data.append('product_id', this.id);
            this.data.append('rating', this.rating);
            this.apip.apicall(method, url, this.data, {}, this.rateCallback);
        } else { this.apip.apicall(method, url, { 'product_id': this.id, 'rating': this.rating }, {}, this.rateCallback); }


    }
    rateCallback(response) {
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);

            console.log(a.data.access_token);
        }
        else {
            var a = (response);
        };
        console.log(a);
        console.log(a.status);

        if (a.status == 200) {

            this.viewcontroller.dismiss();


        } else {
            console.log(a.statusText);


        }

    }
    changeRating(i: number) {
        let rate = i + 1;
        this.rating = rate;
        console.log(this.rating);

    }
    discard() {
        this.viewcontroller.dismiss();
    }


}
