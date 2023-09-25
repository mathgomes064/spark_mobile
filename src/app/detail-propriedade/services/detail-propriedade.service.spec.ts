import { TestBed } from '@angular/core/testing';

import { DetailPropriedadeService } from './detail-propriedade.service';

describe('DetailPropriedadeService', () => {
  let service: DetailPropriedadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailPropriedadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
