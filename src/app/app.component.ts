import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Refresher, Nav, Events, AlertController, ToastController } from 'ionic-angular';
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
import { InvitePage } from '../pages/invite/invite';
import { MenuController } from '../../node_modules/ionic-angular/components/app/menu-controller';
// import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

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

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events, private menuCtrl: MenuController, private alertCtrl: AlertController, public toastCtrl: ToastController, public push: Push) {
        platform.ready().then(() => {

            // fcm.getToken()

            // // Listen to incoming messages
            // fcm.listenToNotifications().pipe(
            //     tap(msg => {
            //         // show a toast
            //         const toast = toastCtrl.create({
            //             message: msg.body,
            //             duration: 3000
            //         });
            //         toast.present();
            //     })
            // )
            //     .subscribe()








            // fcm.subscribeToTopic('all');
            // fcm.getToken().then(token => {
            //     console.log(token);
            // })
            // fcm.onNotification().subscribe(data => {
            //     if (data.wasTapped) {
            //         console.log("Received in background");
            //     } else {
            //         console.log("Received in foreground");
            //     };
            // })
            // fcm.onTokenRefresh().subscribe(token => {
            //     console.log(token);
            // });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            this.pushsetup();
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

    pushsetup() {


        this.push.hasPermission()
            .then((res: any) => {

                if (res.isEnabled) {
                    console.log('We have permission to send push notifications');
                } else {
                    console.log('We do not have permission to send push notifications');
                }

            });
        //from the basic functions 1.2 push
        // var push = this.push1.init({ "android": { "senderID": "661961272477" } });
        // this.push1.on('registration', function (data) {
        //     alert(data.registrationId);
        // });

        // push.on('notification', function (data) {
        //     alert(data.title + " Message: " + data.message);
        // });

        // push.on('error', function (e) {
        //     alert(e);
        // });



        // this.firebase.getToken().then(token => console.log(token)).catch(err => console.log(err));
        // this.firebase.onNotificationOpen().subscribe(data => {
        //     console.log(data);
        //     console.log(data.name)
        // }, err => console.log(err));


        // console.log("in push method");

        const options: PushOptions = {
            android: {
                senderID: '661961272477',
                icon: "/assets/imgs/appicon-1.png",
                iconColor: "#5083af"
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('notification').subscribe((notification: any) => {
            console.log("notification received" + notification);


            let youralert = this.alertCtrl.create({
                title: 'New Push notification',
                message: notification
            });
            youralert.present();
            if (notification.additionalData.foreground) {
                let youralert = this.alertCtrl.create({
                    title: 'New Push notification',
                    message: notification.message
                });
                youralert.present();
            }
        });


        pushObject.on('registration').subscribe((registration: any) => {
            //do whatever you want with the registration ID
        });

        pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
        // }



    };
    logout() {
        localStorage.clear();
        console.log("logout");
        this.nav.setRoot(HomePage);
    }
    cart() {
        this.nav.push(MycartPage);

    };
    myOrders() {
        this.nav.push(MyOrdersPage);

    };
    // table(abcd) {
    //     this.nav.push(ProductsPage, {
    //         id: abcd
    //     })
    // };
    table(abcd) {
        var data1 = JSON.parse(localStorage.getItem("userDetails"));

        var index = data1.data.product_categories.findIndex(img => img.id === abcd);
        console.log(index);
        var type = data1.data.product_categories[index].name;
        this.nav.push(ProductsPage, {
            id: abcd, category: type
        })
        // this.postdata(data);
    }

    map() {
        this.nav.push(MapPage)
    };
    myAccount() {
        this.nav.push(AccountDetailsPage);
        this.menuCtrl.close();
    };
    invite() {
        this.nav.push(InvitePage);
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