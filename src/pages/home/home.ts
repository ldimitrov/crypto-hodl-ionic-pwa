import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
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

  editHodling(hodling): void {
    this.navCtrl.push('EditHodlingPage', {
      param: hodling
    });
  }

  goToCryptonator(): void {
    window.open('https://www.cryptonator.com/api', '_system');
  }

  refreshPrices(refresher): void {
    this.hodlingsProvider.fetchPrices(refresher);
  }

}
