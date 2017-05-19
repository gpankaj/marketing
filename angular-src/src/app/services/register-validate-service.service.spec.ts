/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegisterValidateServiceService } from './register-validate-service.service';

describe('RegisterValidateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterValidateServiceService]
    });
  });

  it('should ...', inject([RegisterValidateServiceService], (service: RegisterValidateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
