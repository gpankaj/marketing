/**
 * Created by pg942665 on 5/3/2017.
 */
import {Application, Router} from "express";
import * as express from 'express';


export class CustomerRouter{
    routerVar:Router = express.Router();

    constructor() {
        this.routerVar.post('/autheticate',(req,res,next)=>{
            res.send("AUTHENTICATE");
        });


        // if logged in, annonymous users are also allowed.
        //User can enable, disable themselves.
        //User can add Cell number if they want notification.
        //User can save preference.
        //Can set to show as annonymous too - this will retain history, preferecnes but shop keeper won't know who was s/he.
        //NOT PROTECTED but save preferences option will redirect to login and save.
        this.routerVar.get('/profile',(req,res,next)=>{
            res.send("PROFILE..");
        });

        //NOT PROTECTED.
        //Search for service providers.
        this.routerVar.get('/search',(req,res,next)=>{
            res.send("SEARCH");
        });

    }


    getRouter() {
        return this.routerVar;
    }

}
