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
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
    map: any;
    start: any;
    end: any;
    lat1: any;
    lng1: any;
    LatLng: any;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    constructor(public navCtrl: NavController, private geolocation: Geolocation, public navparams: NavParams, public alert: AlerttProvider) {

    }

    ionViewDidLoad() {
        this.lat1 = this.navparams.get("lat");
        this.lng1 = this.navparams.get("lng");
        console.log(this.lat1);
        console.log(this.lng1);
        this.initMap();

        // this.end = new google.maps.LatLng(this.lat1, this.lng1);
        // console.log("end", this.end);


    }

    initMap() {
        this.geolocation.getCurrentPosition().then((postion) => {
            this.start = new google.maps.LatLng(postion.coords.latitude, postion.coords.longitude);

            // this.start = '19.137048, 73.006706';
            // this.end = JSON.stringify(this.lat1, this.lng1)
            console.log(this.start);

            let mapOptions = {
                center: this.start,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }


            // this.start = latLng;
            this.directionsDisplay.setMap(this.map);
            this.calculateAndDisplayRoute();
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

        }, (err) => {
            console.log(err);
            //this.marker();
        });



        // this.geolocation.getCurrentPosition().then((postion) => {
        //     var latLng = new google.maps.LatLng(postion.coords.latitude, postion.coords.longitude);
        //     this.start = latLng;
        //     this.directionsDisplay.setMap(this.map);
        //     this.calculateAndDisplayRoute();
        //     localStorage.setItem("latlng", JSON.stringify(latLng));
        // }).catch((error) => {
        //     this.alert.loading.dismiss();
        //     console.log('Error getting location', error);
        // });



        // this.map = new google.maps.map(this.mapElement.nativeElement, {
        //     zoom: 7,
        //     center: this.LatLng,
        // });

        // setTimeout(() => {
        //     this.alert.loading.dismiss();
        //     // this.navCtrl.pop();
        //     // this.alert.presentAlertt("Ooops", "its taking too long to get your location");
        // }, 300000);



    }

    calculateAndDisplayRoute() {
        this.end = new google.maps.LatLng(this.lat1, this.lng1);
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);

        directionsService.route({
            origin: this.start,
            destination: this.end,
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {

            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }

        });

        // var start = new google.maps.LatLng(37.334818, -121.884886);
        // //var end = new google.maps.LatLng(38.334818, -181.884886);
        // var end = new google.maps.LatLng(37.441883, -122.143019);
        // var request = {
        //     origin: this.start,
        //     destination: this.end,
        //     travelMode: google.maps.TravelMode.DRIVING
        // };
        // this.directionsService.route(request, function (response, status) {
        //     if (status == google.maps.DirectionsStatus.OK) {
        //         console.log("response", response);
        //         console.log("request", request);

        //         this.directionsDisplay.setDirections(response);
        //         this.directionsDisplay.setMap(this.map);
        //     } else {
        //         alert("Directions Request from " + this.start.toUrlValue(6) + " to " + this.end.toUrlValue(6) + " failed: " + status);
        //     }
        // });

        // console.log("calculatefunction");

        // // this.alert.loading.dismiss();
        // this.directionsService.route({
        //     origin: this.start,
        //     destination: this.end,
        //     travelMode: 'DRIVING'
        // }, (response, status) => {
        //     if (status === 'OK') {
        //         this.directionsDisplay.setDirections(response);
        //     } else {
        //         window.alert('Directions request failed due to ' + status);
        //     }
        // });
    }
}
