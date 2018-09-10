import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { SMS } from '@ionic-native/sms';
// import { parse } from 'path';

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
    b: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts, private contact: Contact, private sms: SMS) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InvitePage');
    }
    search() {
        // this.contact.find(name);
        this.contacts.pickContact().then((contact) => {
            console.log("fetched", contact);

            this.b = parseFloat(contact.phoneNumbers[0].value);
            var options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                android: {
                    intent: 'INTENT'  // Opens Default sms app
                    //intent: '' // Sends sms without opening default sms app
                }
            }
            this.sms.send(this.b, "check out this amazing,they got the best deals...<beta testing>", options)
                .then(() => {
                    alert("success");
                }, () => {
                    alert("failed");
                });


            console.log("fetched", this.b);
            // this.sms.send(this.b, "check out this amazing,they got the best deals...<beta testing>")
        })



    }
}
