import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController, NavControllerBase } from 'ionic-angular';
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
import { LoaderPage } from '../pages/loader/loader';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ModalbuyPage } from '../pages/modalbuy/modalbuy'
import { ModalratePage } from '../pages/modalrate/modalrate';
import { MycartPage } from '../pages/mycart/mycart';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AddaddressPage } from '../pages/addaddress/addaddress';
import { AddresslistPage } from '../pages/addresslist/addresslist';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { TrackOrderPage } from '../pages/track-order/track-order';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { MapPage } from '../pages/map/map';
import { MyAccountPage } from '../pages/my-account/my-account';
import { DatePicker } from '@ionic-native/date-picker';
import { AccountDetailsPage } from '../pages/account-details/account-details';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SignupPage,
        NeostorePage,
        LoaderPage,
        ProductsPage,
        ProductDetailsPage,
        ForgotPasswordPage,
        ModalbuyPage,
        ModalratePage,
        MycartPage,
        AddaddressPage,
        AddresslistPage,
        MyOrdersPage,
        TrackOrderPage,
        MapPage,
        MyAccountPage,
        AccountDetailsPage,
        ResetPasswordPage,


    ],
    imports: [
        BrowserModule,
        IonicImageViewerModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {

            // backButtonIcon: 'icon-arrow-back',
            // backButtonClass: 'icon-arrow-back',


            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            tabsPlacement: 'bottom',
            pageTransition: 'ios-transition'
        }
        ),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoaderPage,
        SignupPage,
        NeostorePage,
        ProductsPage,
        ProductDetailsPage,
        ForgotPasswordPage,
        ModalbuyPage,
        ModalratePage,
        MycartPage,
        AddaddressPage,
        AddresslistPage,
        MyOrdersPage,
        TrackOrderPage,
        MapPage,
        MyAccountPage,
        AccountDetailsPage,
        ResetPasswordPage,


    ],
    providers: [
        StatusBar,
        SocialSharing,
        // Platform,
        HTTP,

        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AlerttProvider,
        HttpClient,
        ApiintegrateProvider,
        UrlProvider,
        ModalbuyPage,
        ModalratePage,
        ImagePicker,
        Camera,
        DatePicker,





    ]
})
export class AppModule { }