import { TestBed } from '@angular/core/testing';

import { GastosSharedService } from './gastos-shared.service';

describe('GastosSharedService', () => {
  let service: GastosSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastosSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
