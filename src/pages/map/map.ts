import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, ) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');

    }


}

