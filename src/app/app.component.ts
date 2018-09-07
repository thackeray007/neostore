import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Refresher, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoaderPage } from '../pages/loader/loader';
import { ResourceLoader } from '../../node_modules/@angular/compiler';
import { platform, homedir } from 'os';
import { MycartPage } from '../pages/mycart/mycart';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { ProductsPage } from '../pages/products/products';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { MapPage } from '../pages/map/map';
import { MyAccountPage } from '../pages/my-account/my-account';
import { AccountDetailsPage } from '../pages/account-details/account-details';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    data: any;
    name: any;
    email: any;
    cart_no: any;
    dp: any;
    total_cart: any;
    @ViewChild(Nav) nav: Nav;
    rootPage: any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

        });
        this.userData()
        events.subscribe('cart:cart', (cart_items) => {
            // user and time are the same arguments passed in `events.publish(user, time)`
            this.total_cart = cart_items;
            console.log(this.total_cart);


        });
        this.events.subscribe('details:updated', (f_name, l_name, email, dob, number, dp) => {
            this.name = f_name + " " + l_name;
            this.email = email;
            this.dp = dp;

        });

        // console.log("userDetails", data1);


    }


    logout() {
        localStorage.clear();
        console.log("logout");
        this.nav.setRoot(HomePage);

    };
    cart() {
        this.nav.push(MycartPage);

    };
    myOrders() {
        this.nav.push(MyOrdersPage);

    };
    table(abcd) {
        this.nav.push(ProductsPage, {
            id: abcd
        })
    };
    map() {
        this.nav.push(MapPage)
    };
    myAccount() {
        this.nav.push(AccountDetailsPage);
    };
    userData() {
        this.data = localStorage.getItem("userDetails");
        if (this.data == null || this.data == undefined) {
            setTimeout(() => {
                this.userData()
            }, 2500);
        } else {

            this.name = JSON.parse(this.data).data.user_data.first_name + " " + JSON.parse(this.data).data.user_data.last_name;
            console.log("name", this.name);
            this.email = JSON.parse(this.data).data.user_data.email;
            this.total_cart = JSON.parse(this.data).data.total_carts;
            this.dp = JSON.parse(this.data).data.user_data.profile_pic;
            this.dp = JSON.parse(this.data).data.user_data.profile_pic;
            setTimeout(() => {
                if (this.dp == 0) {
                    this.dp = "../assets/myAvatar.png";
                };
            }, 0);

        }
    }

}