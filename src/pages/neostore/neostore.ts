import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slide } from 'ionic-angular';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';

/**
 * Generated class for the NeostorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-neostore',
  templateUrl: 'neostore.html',
})
export class NeostorePage {
public products:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apip:ApiintegrateProvider) {
  }
  @ViewChild(Slides)slides:Slides;
  //this.slides.slideto(2,500);

  ionViewDidLoad() {
    console.log('ionViewDidLoad NeostorePage');
    var url="http://staging.php-dev.in:8844/trainingapp/api/products/getList";
    var method="get";
    var data=this.apip.apicall(method,url,{},{});
    console.log(data);

    
    
  }


}
