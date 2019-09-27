import { TestBed } from '@angular/core/testing';

import { CouchbaseSessionService } from './couchbase-session.service';

describe('CouchbaseSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CouchbaseSessionService = TestBed.get(CouchbaseSessionService);
    expect(service).toBeTruthy();
  });
});
