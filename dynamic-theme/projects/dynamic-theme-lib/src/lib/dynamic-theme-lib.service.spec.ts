import { TestBed } from '@angular/core/testing';

import { DynamicThemeLibService } from './dynamic-theme-lib.service';

describe('DynamicThemeLibService', () => {
  let service: DynamicThemeLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicThemeLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
