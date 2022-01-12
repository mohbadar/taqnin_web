import { TestBed } from '@angular/core/testing';

import { TaqninDocumentService } from './document.service';

describe('TaqninDocumentService', () => {
  let service: TaqninDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaqninDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
