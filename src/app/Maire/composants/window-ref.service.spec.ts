import { WindowRef } from './window-ref.service';
import { TestBed } from '@angular/core/testing';



describe('WindowRefService', () => {
  let service: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
