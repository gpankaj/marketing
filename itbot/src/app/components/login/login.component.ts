import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  constructor(private flashMessagesService: FlashMessagesService , private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    //this.flashMessagesService.show(this.email  + " " + this.password ,{cssClass:'alert-danger',timeout:3000});
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data=>{
      if(data.success){

        this.authService.storeUserData(data.token, data.user);

        this.flashMessagesService.show(data.msg ,{cssClass:'alert-success',timeout:5000});
        this.router.navigate(['profile']);
      } else {
        this.flashMessagesService.show(data.msg ,{cssClass:'alert-danger',timeout:5000});
        this.router.navigate(['login']);
      }
    });
  }

}
