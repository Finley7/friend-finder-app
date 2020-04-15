import { TestBed } from '@angular/core/testing';

import { SecurityApiService } from './security.api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecurityApiService = TestBed.get(SecurityApiService);
    expect(service).toBeTruthy();
  });
});
