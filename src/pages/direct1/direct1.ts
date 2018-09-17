import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NavParams } from '../../../node_modules/ionic-angular/navigation/nav-params';
import { AlerttProvider } from '../../providers/alertt/alertt';
declare var google;
/**
 * Generated class for the Direct1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-direct1',
    templateUrl: 'direct1.html',
})
export class Direct1Page {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    start: any;
    end = '17.023371, 72.839512';
    lat1: any;
    lng1: any;
    LatLng: any;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    constructor(public navCtrl: NavController, public geolocation: Geolocation, public navparams: NavParams, public alert: AlerttProvider) {

    }

    ionViewDidLoad() {
        this.lat1 = this.navparams.get("lat");
        this.lng1 = this.navparams.get("lng");
        console.log(this.lat1);
        console.log(this.lng1);


        // this.end = new google.maps.LatLng(this.lat1, this.lng1);
        // console.log("end", this.end);

        this.initMap();
    }

    initMap() {
        this.alert.presentLoadingDefault('getting your current location')
        this.geolocation.getCurrentPosition().then((postion) => {
            var latLng = new google.maps.LatLng(postion.coords.latitude, postion.coords.longitude);
            this.start = latLng;
            setTimeout(() => {
                this.directionsDisplay.setMap(this.map);
                this.calculateAndDisplayRoute();
            }, 0);
            localStorage.setItem("latlng", JSON.stringify(latLng));
        }).catch((error) => {
            this.alert.loading.dismiss();
            console.log('Error getting location', error);
        });
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 7,
            center: this.LatLng,
        });

        setTimeout(() => {
            this.alert.loading.dismiss();
            this.navCtrl.pop();
            this.alert.presentAlertt("Ooops", "its taking too long to get your location");
        }, 3000);



    }

    calculateAndDisplayRoute() {
        this.alert.loading.dismiss();
        this.directionsService.route({
            origin: this.start,
            destination: this.end,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                this.directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}
