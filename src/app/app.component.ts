import { Component } from '@angular/core';
import { Platform, NavController, Refresher } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoaderPage } from '../pages/loader/loader';
import { ResourceLoader } from '../../node_modules/@angular/compiler';
import { platform } from 'os';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
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

    };
}

