import { TestBed, inject } from '@angular/core/testing';

import { PartieService } from './partie.service';

describe('PartieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartieService]
    });
  });

  it('should ...', inject([PartieService], (service: PartieService) => {
    expect(service).toBeTruthy();
  }));
});
