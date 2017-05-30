import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken:any;
  user:any;

  constructor(private http : Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/register',user,{headers:headers})
    //return this.http.post('register',user,{headers:headers})
      .map(res=>res.json());
  }
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/authenticate',user,{headers:headers})
    //return this.http.post('authenticate',user,{headers:headers})
      .map(res=>res.json());
  }

  getProfile(){
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization',this.authToken);

    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:8080/profile',{headers:headers})
    //return this.http.get('profile',{headers:headers})
      .map(res=>res.json());
  }

  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }


  storeUserData(token,user){

    localStorage.setItem('token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout(){
    this.authToken = null;
    this.user= null;
    localStorage.clear();
  }
}
