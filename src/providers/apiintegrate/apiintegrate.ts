//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ Http } from '@angular/http';
//import{ HTTP } from '@ionic-native/http';
/*
  Generated class for the ApiintegrateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiintegrateProvider {

  constructor(public http:Http) {
    console.log('Hello ApiintegrateProvider Provider');
  }
apicall(method,url,data,{}){

   if(method=='post'){
     this.http.post(url,data,{}).subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });


     
     
     
   }else{if(method=='get'){
     //return this.http.get(url,data,{});

   }
}

}


}
