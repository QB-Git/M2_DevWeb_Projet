import { TestBed } from '@angular/core/testing';

import { FormatGameService } from './format-game.service';

describe('FormatGameService', () => {
  let service: FormatGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
