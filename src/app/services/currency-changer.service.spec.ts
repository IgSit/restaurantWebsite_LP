import { TestBed } from '@angular/core/testing';

import { CurrencyChangerService } from './currency-changer.service';

describe('CurrencyChangerService', () => {
  let service: CurrencyChangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyChangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
