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
    locations = [{ name: 'mumbai', address: 'ruby_office' }, { name: 'mumbai', address: 'ruby_office' }, { name: 'mumbai', address: 'ruby_office' }, { name: 'mumbai', address: 'ruby_office' }];
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
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }
    addmarker() {
        var latLng = new google.maps.LatLng(19.157934, 72.993477);
        var loc = "NAVI MUMBAI";
        this.marker(latLng, loc);
        var latLng1 = new google.maps.LatLng(19.023371, 72.839545);
        var loc1 = "MUMBAI(HQ)";
        this.marker(latLng1, loc1);
        var latLng2 = new google.maps.LatLng(19.013514, 72.826486);
        var loc2 = "MUMBAI";
        this.marker(latLng2, loc2);
        var latLng3 = new google.maps.LatLng(18.591626, 73.737803);
        var loc3 = "PUNE";
        this.marker(latLng3, loc3);

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
}
