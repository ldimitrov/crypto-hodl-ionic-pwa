import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HodlingsProvider } from '../../providers/hodlings/hodlings';

interface Hodling {
  crypto: string,
  currency: string,
  amount: number,
  value?: number
}

@IonicPage()
@Component({
  selector: 'page-edit-hodling',
  templateUrl: 'edit-hodling.html',
})
export class EditHodlingPage {

  private hodling: Hodling;
  private cryptoUnavailable: boolean = false;
  private checkingValidity: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private hodlingsProvider: HodlingsProvider) {
    this.hodling = navParams.get('param');
  }

  saveEdits() {
    this.cryptoUnavailable = false;
    this.checkingValidity = true;

    this.hodlingsProvider.verifyHodling(this.hodling).subscribe((result) => {
      this.checkingValidity = false;

      if (result.success) {
        this.hodlingsProvider.editHodling(this.hodling);
        this.navCtrl.pop();
      } else {
        this.cryptoUnavailable = true;
      }

    }, (err) => {
      this.checkingValidity = false;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditHodlingPage');
  }

}
