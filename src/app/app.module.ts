import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { AlerttProvider } from '../providers/alertt/alertt';
import { ApiintegrateProvider } from '../providers/apiintegrate/apiintegrate';
import { UrlProvider } from '../providers/url/url';
import { HttpModule } from '@angular/http';
import { NeostorePage } from '../pages/neostore/neostore';
import { ProductsPage } from '../pages/products/products';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { Device } from '@ionic-native/device';
import { Platform } from 'ionic-angular';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SignupPage,
        NeostorePage,
        ProductsPage,
        ProductDetailsPage,
        ForgotPasswordPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        SignupPage,
        NeostorePage,
        ProductsPage,
        ProductDetailsPage,
        ForgotPasswordPage
    ],
    providers: [
        StatusBar,
        // Platform,
        HTTP,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AlerttProvider,
        HttpClient,
        ApiintegrateProvider,
        UrlProvider,
    ]
})
export class AppModule { }
