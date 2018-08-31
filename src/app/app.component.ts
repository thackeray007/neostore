import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Refresher, Nav } from 'ionic-angular';
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
    @ViewChild(Nav) nav: Nav;
    rootPage: any = LoaderPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });

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
}
