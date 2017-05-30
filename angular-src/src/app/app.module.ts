import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import {RegisterValidateServiceService} from './services/register-validate-service.service';
import {FlashMessagesModule} from "angular2-flash-messages";
import {AuthService} from "./services/auth.service";
import { AuthGuard } from './guards/auth.guard';
import { EstablishmentComponent } from './components/establishment/establishment.component';
import { BotComponent } from './components/bot/bot.component';
import { ChatComponent } from './components/chat/chat.component';
import { CustomerComponent } from './components/customer/customer.component';

const appRoutes:Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'customers',component:CustomerComponent, canActivate:[AuthGuard]}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    EstablishmentComponent,
    BotComponent,
    ChatComponent,
    CustomerComponent
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
