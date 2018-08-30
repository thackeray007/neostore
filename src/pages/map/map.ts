import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// // import {
//     GoogleMaps,
//     GoogleMap,
//     GoogleMapsEvent,
//     GoogleMapOptions,
//     CameraPosition,
//     MarkerOptions,
//     Marker
// } from '@ionic-native/google-maps';


/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, ) {
        // this.loadmap();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
        // this.loadmap();
    }

    // loadmap() {

    //     let element = this.mapElement.nativeElement;
    //     this.map = this.googlemaps.create(element);

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
    //     // marker.onclic(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //     //     alert('clicked');
    //     // });
    // }
}

