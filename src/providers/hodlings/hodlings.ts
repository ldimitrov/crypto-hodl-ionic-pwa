import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { timeoutWith } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

interface Hodling {
  crypto: string,
  currency: string,
  amount: number,
  value?: number
}

const API_BASE_URL = 'https://api.cryptonator.com/api/ticker/';
@Injectable()
export class HodlingsProvider {

  public hodlings: Hodling[] = [];
  public pricesUnavailable: boolean = false;

  constructor(public http: HttpClient, private storage: Storage) {
  }

  addHodling(hodling: Hodling): void {
    this.hodlings.push(hodling);
    this.fetchPrices();
    this.saveHodlings();
  }

  editHodling(hodling: Hodling) {
    let index = this.hodlings.indexOf(hodling);
    this.hodlings[index] = hodling;
    this.fetchPrices();
    this.saveHodlings();
  }

  removeHodling(hodling): void {
    this.hodlings.splice(this.hodlings.indexOf(hodling), 1);
    this.fetchPrices();
    this.saveHodlings();
  }

  saveHodlings(): void {
    this.storage.set('cryptohodlings', this.hodlings);
  }

  loadHodlings(): void {
    this.storage.get('cryptohodlings').then(hodlings => {
      if (hodlings !== null) {
        this.hodlings = hodlings;
        this.fetchPrices();
      }
    });
  }

  verifyHodling(hodling): Observable<any> {
    return this.http.get(API_BASE_URL + hodling.crypto + '-' + hodling.currency).pipe(
      timeoutWith(5000, Observable.throw(new Error('Failed to verify HODLing.')))
    );
  }

  fetchPrices(refresher?): void {
    let requests = [];
    for (let hodling of this.hodlings) {
      let request = this.http.get(API_BASE_URL + hodling.crypto + '-' + hodling.currency);
      requests.push(request);
    }

    forkJoin(requests).pipe(
      timeoutWith(5000, Observable.throw(new Error('Failed to fetch prices.')))
    ).subscribe(results => {
      results.forEach((result: any, index) => {
        this.hodlings[index].value = result.ticker.price;
      });

      if (typeof (refresher) !== 'undefined') {
        refresher.complete();
      }

      this.saveHodlings();

    }, err => {
      if (typeof (refresher) !== 'undefined') {
        refresher.complete();
      }

    });

  }
}
