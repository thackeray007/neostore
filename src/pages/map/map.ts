import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    latlng: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, ) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
        this.loadMap();
        this.addmarker();
    }
    loadMap() {

        let latLng = new google.maps.LatLng(19.157934, 72.993477);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }
    addmarker() {
        var latLng = new google.maps.LatLng(19.157934, 72.993477);
        this.marker(latLng);

    }
    marker(latlng) {




        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latlng,
        });
        let content = 'you are here';
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
}
