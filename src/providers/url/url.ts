import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemplateBindingParseResult } from '../../../node_modules/@angular/compiler';
import { Http } from '../../../node_modules/@angular/http';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlProvider {

    constructor(public http: Http) {
        console.log('Hello UrlProvider Provider');
    }

    public baseUrl: string = "http://staging.php-dev.in:8844/trainingapp/api/";

    public login = this.baseUrl + "users/login";
    public register = this.baseUrl + "users/register";
    public forgot_pass = this.baseUrl + "users/forgot";
    public loader = this.baseUrl + "users/getUserData";
    public tile = this.baseUrl + "products/getList";
    public details = this.baseUrl + "products/getDetail";
    public add = this.baseUrl + "addToCart";
    public cart = this.baseUrl + "cart";
    public deleteCart = this.baseUrl + "deleteCart";
}


