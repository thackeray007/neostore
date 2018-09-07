import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

/**
 * Generated class for the InvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-invite',
    templateUrl: 'invite.html',
})
export class InvitePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public contacts: Contacts, public contact: Contact) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InvitePage');
    }
    search() {
        // this.contact.find(name);
        var a = this.contacts.pickContact();
        console.log("fetched", a);

    }
}
