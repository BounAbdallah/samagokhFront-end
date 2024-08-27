import { TestBed } from '@angular/core/testing';

import { ProjetService2 } from './projet2.service';

describe('ProjetService', () => {
  let service: ProjetService2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetService2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
