import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
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
    start = '42R5+CG Navi Mumbai, Maharashtra';
    end = '3VGH+93 Mumbai, Maharashtra';
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    constructor(public navCtrl: NavController) {

    }

    ionViewDidLoad() {
        this.initMap();
    }

    initMap() {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 7,
            center: { lat: 41.85, lng: -87.65 }
        });

        this.directionsDisplay.setMap(this.map);
        this.calculateAndDisplayRoute();
    }

    calculateAndDisplayRoute() {
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
