import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HodlingsProvider } from '../../providers/hodlings/hodlings';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(private navCtrl: NavController, private hodlingsProvider: HodlingsProvider) {
    }

    ionViewDidLoad(): void {
        this.hodlingsProvider.loadHodlings();
    }

    addHodling(): void {
        this.navCtrl.push('AddHodlingPage');
    }

    goToCryptonator(): void {
        window.open('https://www.cryptonator.com/api', '_system');
    }

    refreshPrices(refresher): void {
        this.hodlingsProvider.fetchPrices(refresher);
    }

}
