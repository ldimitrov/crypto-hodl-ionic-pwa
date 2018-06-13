import { Component } from '@angular/core';
import { NavController, IonicPage, ItemSliding, AlertController } from 'ionic-angular';
import { HodlingsProvider } from '../../providers/hodlings/hodlings';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController, private hodlingsProvider: HodlingsProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad(): void {
    this.hodlingsProvider.loadHodlings();
  }

  addHodling(): void {
    this.navCtrl.push('AddHodlingPage');
  }

  removeHodling(hodling, slidingItem: ItemSliding): void {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you want to remove this HODLing?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.hodlingsProvider.removeHodling(hodling);
          }
        }
      ]
    });
    alert.present();
  }

  goToCryptonator(): void {
    window.open('https://www.cryptonator.com/api', '_system');
  }

  refreshPrices(refresher): void {
    this.hodlingsProvider.fetchPrices(refresher);
  }

}
