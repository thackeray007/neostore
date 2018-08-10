//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ Http } from '@angular/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
//import{ HTTP } from '@ionic-native/http';
/*
  Generated class for the ApiintegrateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiintegrateProvider {
  s1:Observable<any>;
  
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
     
     this.s1=this.http.get(url);
    this.s1
    .subscribe(data=>{
      console.log("my data",data);
      
    })
   }
}

}


}
