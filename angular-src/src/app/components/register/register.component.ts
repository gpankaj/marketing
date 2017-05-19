import { Component, OnInit } from '@angular/core';
import {RegisterValidateServiceService} from "../../services/register-validate-service.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: String;
  password1: String;
  password2: String;

  constructor(private registerValidateService: RegisterValidateServiceService,
              private flashMessagesService : FlashMessagesService, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
      const user = {
        email: this.email,
        password: this.password1,
      }

      if(!this.registerValidateService.validateRegsiter(this.email,this.password1,this.password2)) {
        this.flashMessagesService.show("Please fill in all the required fields.", {cssClass:'alert-danger',timeout:3000});
        return false;
      }

      if(!this.registerValidateService.validateEmail(user.email)){
        this.flashMessagesService.show("Email is not right ",{cssClass:'alert-danger',timeout:3000})
        return false;
      }
      if(this.password1 == this.password2){

        this.authService.registerUser(user).subscribe(data=>{
          if(data.success){
            this.flashMessagesService.show("You are now registered",{cssClass:'alert-success',timeout:3000});
            this.router.navigate(['/login']);

          } else {
            this.flashMessagesService.show("Failed to Register",{cssClass:'alert-danger',timeout:3000});
          }
        })
        //this.flashMessagesService.show("Success",{cssClass:'alert-success',timeout:3000});



        return true;
      } else {
        this.flashMessagesService.show("Password does not match", {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }

      //Register User

  }
}
