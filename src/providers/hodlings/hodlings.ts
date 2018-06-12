import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HodlingsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HodlingsProvider Provider');
  }

}
