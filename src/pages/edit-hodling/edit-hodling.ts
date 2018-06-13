import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HodlingsProvider } from '../../providers/hodlings/hodlings';

interface Hodling {
  crypto: string,
  currency: string,
  amount: number,
  value?: number
}

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-edit-hodling',
  templateUrl: 'edit-hodling.html',
})
export class EditHodlingPage {

  private hodling: Hodling;
  private cryptoUnavailable: boolean = false;
  private checkingValidity: boolean = false;
  private noConnection: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private hodlingsProvider: HodlingsProvider,
    private alertCtrl: AlertController) {
    this.hodling = navParams.get('param');
  }

  saveEdits() {
    this.cryptoUnavailable = false;
    this.checkingValidity = true;
    this.noConnection = false;

    this.hodlingsProvider.verifyHodling(this.hodling).subscribe((result) => {
      this.checkingValidity = false;

      if (result.success) {
        this.hodlingsProvider.editHodling(this.hodling);
        this.navCtrl.pop();
      } else {
        this.cryptoUnavailable = true;
      }

    }, (err) => {
      this.noConnection = true;
      this.checkingValidity = false;
    });
  }

  removeHodling(hodling): void {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you want to remove this HODLing?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.hodlingsProvider.removeHodling(hodling);
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditHodlingPage');
  }

}
