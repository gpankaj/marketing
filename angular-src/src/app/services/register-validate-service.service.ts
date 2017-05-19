import { Injectable } from '@angular/core';

@Injectable()
export class RegisterValidateServiceService {

  constructor() { }

  validateRegsiter(email,password1, password2) {


    if (email == undefined || password1==undefined || password2==undefined) {
      return false;
    } else {
      return true;
    }
  }


  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
