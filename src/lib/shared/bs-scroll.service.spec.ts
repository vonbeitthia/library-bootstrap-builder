import { TestBed } from '@angular/core/testing';

import { BsScrollService } from './bs-scroll.service';

describe('BsScrollService', () => {
  let service: BsScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BsScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
