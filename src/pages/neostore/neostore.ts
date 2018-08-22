import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slide, Platform } from 'ionic-angular';
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
    constructor(public url: UrlProvider, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public apip: ApiintegrateProvider) {


    }
    @ViewChild(Slides) slides: Slides;
    //this.slides.slideto(2,500);

    ionViewDidLoad() {
        // console.log('ionViewDidLoad NeostorePage');
        // var url="http://staging.php-dev.in:8844/trainingapp/api/products/getList";
        // var method="get";
        // var data=this.apip.apicall(method,url,{},{});
        // console.log(data);

        this.slider_pics();

    }

    slider_pics() {
        var url: any = "http://staging.php-dev.in:8844/trainingapp/api/users/getUserData";
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

        }
        else {
            var a = JSON.parse(response.data);
            console.log("a" + a);
            this.images = a.data.product_categories;
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


}
