import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthGuard} from "./guards/auth.guard";

import {AuthService} from "./services/auth.service";
import {RegisterValidateServiceService} from "./services/register-validate-service.service";

import {FlashMessagesModule} from "angular2-flash-messages";
import { CreatebotComponent } from './components/createbot/createbot.component';
import { AllbotsComponent } from './components/allbots/allbots.component';

const appRoutes:Routes = [
  {path:'', component: DashboardComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'create', component: CreatebotComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    CreatebotComponent,
    AllbotsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [RegisterValidateServiceService,AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
