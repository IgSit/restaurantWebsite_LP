import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyChangerService {
  currency : string = 'dollar'

  constructor() { }
}
