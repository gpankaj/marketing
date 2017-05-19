import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private flashMessagesService: FlashMessagesService , private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
  onLogoutclick(){
    this.authService.logout();
    this.flashMessagesService.show("You are now logged out", {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['login'])
    return false;
  }
}
