import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, InfiniteScroll, ToastController, LoadingController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { RequestOptions, Headers } from '../../../node_modules/@angular/http';
import { toObservable } from '../../../node_modules/@angular/forms/src/validators';
import { watchFile } from 'fs';
import { ProductDetailsPage } from '../product-details/product-details';
import { AlerttProvider } from '../../providers/alertt/alertt';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-products',
    templateUrl: 'products.html',
    // template:
    //     `<ion-icon *ngFor="let n of ratingRange; let i = index" [name]="i < rating ? 'star' : 'star-outline'"></ion-icon>`
})
export class ProductsPage {
    public product1: any = [];
    public abcd: any = [];
    public data: any;
    public limit: any = 8;
    public page: any = 1;
    reActiveInfinite: any;
    title: any;

    // public rating: any = [];
    constructor(public toastCtrl: ToastController, public url: UrlProvider, public apip: ApiintegrateProvider, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public alert: AlerttProvider) {

    }

    ionViewDidLoad() {
        this.postdata = this.postdata.bind(this);
        console.log('ionViewDidLoad ProductsPage');
        this.data = JSON.stringify(this.navParams.get('id'));
        this.title = this.navParams.get('category');

        console.log("data" + this.data);

        this.postdata();
    }

    postdata() {
        this.alert.presentLoadingDefault('list being prepared');
        var method = "get";
        var url = this.url.tile;
        console.log(this.data);
        var headers = new Headers({ 'product_category_id': this.data, 'limit': this.limit, 'page': this.page });
        // headers.append('access_token', data);
        console.log(headers);
        this.tileCallback = this.tileCallback.bind(this);
        var options = new RequestOptions({ headers: headers, params: { 'product_category_id': this.data, 'limit': this.limit, 'page': this.page } });
        // return this.apip.apicall(method, url, options, this.tileCallback);
        // console.log(this.data);
        if (this.platform.is('mobileweb')) {
            this.apip.apicall(method, url, options, {}, this.tileCallback);
        } else { this.apip.apicall(method, url, {}, { 'product_category_id': this.data, 'limit': JSON.stringify(this.limit), 'page': JSON.stringify(this.page) }, this.tileCallback); }

    }
    tileCallback(response) {
        setTimeout(() => {
            this.alert.loading.dismiss();
        }, 10);

        // console.log(response._body);
        if (this.platform.is('mobileweb')) {
            var a = JSON.parse(response._body);

            console.log(a);
            console.log(response);


        }
        else {
            var a = JSON.parse(response.data);
            console.log("asdasd");
            console.log(response.data);
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
        // console.log(a);
        // console.log(a.status);
        if (a.status == 200) {
            console.log("asda", a.data);
            // this.navCtrl.setRoot(LoaderPage);
            this.abcd = this.abcd.concat(a.data);
            // this.rating = this.abcd.rating;
            // this.abcd = a.data;
            console.log("asdasdasd", this.abcd);
            // this.abcd = a.data;
            console.log("asd" + this.product1);

        } else {
            console.log(a.statusText);

            // this.alertp.presentAlert(a.statusText);
        }

        this.presentToast();
    }

    doInfinite(infiniteScroll: any) {

        console.log('doInfinite, start is currently ' + this.limit);
        // this.limit += 5;

        this.page++;
        // this.postdata();
        setTimeout(() => {

            this.reActiveInfinite = infiniteScroll;
            this.postdata();

            infiniteScroll.enable(false);
            // infiniteScroll.complete();
            // });


        });


    }
    fun(id) {
        this.navCtrl.push(ProductDetailsPage, {
            id: id, title: this.title
        })

    };
    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'showing' + this.abcd.length + "out of" + this.abcd.length,
            duration: 3000,
            position: 'bottom'

        });
        toast.present();

    }


}
