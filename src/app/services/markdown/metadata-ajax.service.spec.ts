import { TestBed } from '@angular/core/testing';

import { MetadataAjaxService } from './metadata-ajax.service';

describe('MetadataAjaxService', () => {
  let service: MetadataAjaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataAjaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
