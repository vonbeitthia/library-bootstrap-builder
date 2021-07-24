import { TestBed } from '@angular/core/testing';

import { BsModalServiceService } from './bs-modal-service.service';

describe('BsModalServiceService', () => {
  let service: BsModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BsModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
