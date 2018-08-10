import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import{SignupPage} from '../signup/signup';
import { Message } from '../../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { ApiintegrateProvider } from '../../providers/apiintegrate/apiintegrate';
import { AlerttProvider } from '../../providers/alertt/alertt';
import { EmailValidator } from '../../../node_modules/@angular/forms';
import { viewClassName } from '../../../node_modules/@angular/compiler';
import { NeostorePage } from '../neostore/neostore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 public email:string;
 public Password:string;

  constructor(public navCtrl: NavController,public alertp:AlerttProvider,public apip:ApiintegrateProvider) {
    

  }
  validate(){
var data=new FormData();
data.append('email',this.email);
data.append('password',this.Password);

if(this.email==undefined||this.email==null){
  var mess="username can not be empty";
  console.log(this.email);
  this.alertp.presentAlert(mess);
  }else{
  if(this.Password==undefined||this.Password==null){
    var mess="password is essential";
    this.alertp.presentAlert(mess);
    
    }else if(mess==undefined||mess==""){
      var method="post";
        var url="http://staging.php-dev.in:8844/trainingapp/api/users/login";
        console.log(data);
        this.apip.apicall(method,url,data,{});
      console.log(data);
    } else{ 
  console.log(mess);
  this.alertp.presentAlert(mess);
}}}

a1(){
  this.navCtrl.push(SignupPage);
}
a2(){
  this.navCtrl.setRoot(NeostorePage);
}

}
