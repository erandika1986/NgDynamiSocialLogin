import { TestBed } from '@angular/core/testing';

import { NgDynamiSocialLoginService } from './ng-dynami-social-login.service';

describe('NgDynamiSocialLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgDynamiSocialLoginService = TestBed.get(NgDynamiSocialLoginService);
    expect(service).toBeTruthy();
  });
});
