import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Direct1Page } from '../direct1/direct1';

// import {
//     GoogleMaps,
//     GoogleMap,
//     GoogleMapsEvent,
//     GoogleMapOptions,
//     CameraPosition,
//     MarkerOptions,
//     Marker
// } from '@ionic-native/google-maps';
//   import { Component } from "@angular/core/";
declare var google;

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    // map: GoogleMap;
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    latlng: any;
    locations = [{ name: 'NEOSOFT SOFTWARE', address: 'The Ruby, Dadar, Mumbai-400 028, INDIA', lat: 19.157934, lng: 72.993477 }, { name: 'NEOSOFT SOFTWARE', address: '124 Unique Estate, Mumbai - 400 025, INDIA', lat: 19.013514, lng: 72.826486 }, { name: 'NEOSOFT SOFTWARE', address: 'Sigma IT Park, Navi Mumbai-400 701, INDIA', lat: 19.137048, lng: 73.006706 }, { name: 'NEOSOFT SOFTWARE', address: 'Infotech Park, Hinjewadi, Pune-411 057', lat: 18.591626, lng: 73.737803 }];
    co_ord = [{ lat: 19.157934, lng: 72.993477 },];
    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
        this.loadMap();
        this.addmarker();
    }
    // loadMap() {

    //     let mapOptions: GoogleMapOptions = {
    //         camera: {
    //             target: {
    //                 lat: 43.0741904,
    //                 lng: -89.3809802
    //             },
    //             zoom: 18,
    //             tilt: 30
    //         }
    //     };

    //     this.map = GoogleMaps.create('map_canvas', mapOptions);

    //     let marker: Marker = this.map.addMarkerSync({
    //         title: 'Ionic',
    //         icon: 'blue',
    //         animation: 'DROP',
    //         position: {
    //             lat: 43.0741904,
    //             lng: -89.3809802
    //         }
    //     });
    //     // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //     //     alert('clicked');
    //     // });
    // }
    loadMap() {

        let latLng = new google.maps.LatLng(19.157934, 72.993477);

        let mapOptions = {
            center: latLng,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }
    addmarker() {
        let i;
        for (i = 0; i < this.locations.length; i++) {
            var latLng = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);
            var loc = this.locations[i].address;
            this.marker(latLng, loc);

        }
        // var latLng = new google.maps.LatLng(19.157934, 72.993477);
        // var loc = "NAVI MUMBAI";
        // this.marker(latLng, loc);
        // var latLng1 = new google.maps.LatLng(19.023371, 72.839545);
        // var loc1 = "MUMBAI(HQ)";
        // this.marker(latLng1, loc1);
        // var latLng2 = new google.maps.LatLng(19.013514, 72.826486);
        // var loc2 = "MUMBAI";
        // this.marker(latLng2, loc2);
        // var latLng3 = new google.maps.LatLng(18.591626, 73.737803);
        // var loc3 = "PUNE";
        // this.marker(latLng3, loc3);

    }
    marker(latlng, loc) {




        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latlng,
        });
        let content = loc;
        this.addinfowindow(marker, content);
    }
    addinfowindow(marker, content) {
        let infowindow = new google.maps.InfoWindow({
            content: content,
        });
        google.maps.event.addListener(marker, 'click', () => {
            infowindow.open(this.map, marker);

        });

    }
    // locateto(i) {
    //     let latLng = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);

    //     let mapOptions = {
    //         center: latLng,
    //         zoom: 15,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     }

    //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //     this.addmarker();
    // }
    locateto(i) {

        this.navCtrl.push(Direct1Page, { i: i });
        // let destination = 19.157934 + ',' + 72.993477;

        // if (this.platform.is('ios')) {
        //     window.open('maps://?q=' + destination, '_system');
        // } else {
        //     let label = encodeURI('My Label');
        //     window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
        // }

    }
}
