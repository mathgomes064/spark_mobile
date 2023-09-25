import { TestBed } from '@angular/core/testing';

import { CompartimentoService } from './compartimento.service';

describe('CompartimentoService', () => {
  let service: CompartimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
