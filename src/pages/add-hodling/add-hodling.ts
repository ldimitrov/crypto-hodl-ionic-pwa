import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HodlingsProvider } from '../../providers/hodlings/hodlings';

@IonicPage({
    defaultHistory: ['HomePage']
})
@Component({
    selector: 'page-add-hodling',
    templateUrl: 'add-hodling.html'
})
export class AddHodlingPage {

    private cryptoUnavailable: boolean = false;
    private checkingValidity: boolean = false;
    private cryptoTicker: string;
    private fiatCurrency: string;
    private amountHodling;

    constructor(private navCtrl: NavController, private hodlingsProvider: HodlingsProvider) {
    }

    addHodling(): void {
        this.cryptoUnavailable = false;
        this.checkingValidity = true;

        let hodling = {
            crypto: this.cryptoTicker,
            currency: this.fiatCurrency,
            amount: this.amountHodling || 0
        };

        this.hodlingsProvider.verifyHodling(hodling).subscribe((result) => {
            this.checkingValidity = false;

            if(result.success){
                this.hodlingsProvider.addHodling(hodling);
                this.navCtrl.pop();
            } else {
                this.cryptoUnavailable = true;
            }

        }, (err) => {
            this.checkingValidity = false;
        });
    }
}
