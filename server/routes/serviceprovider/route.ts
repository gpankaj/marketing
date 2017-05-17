/**
 * Created by pg942665 on 5/3/2017.
 */
import {Application, Router} from "express";
import * as express from 'express';
import {AuthRouter} from "../auth/route";
import {ServerConfig} from "../../config/server";


var authRouter = new AuthRouter();

export class ServiceProviderRoute{
    routerVar:Router = express.Router();



    constructor() {



        //Only service Provider can login to this.
        this.routerVar.post('/autheticate',(req,res,next)=>{
            res.send("AUTHENTICATE");
        });

        // if logged in show profile
        //Shop keeper can enable, disable themselves.
        //Shop keeper can open shop or close shop anytime.
        //Shop keeper can show if he is available to chat or not.
        //Shop keeper can add pictures, contact information etc.

        //PROTECTED//
        this.routerVar.get('/profile',ServerConfig.passport.authenticate('jwt',{session:false}),(req,res,next)=>{
            res.send("It's your profile");
        });


        //List of customers trying to contact a serviceProvider.
        //PROTECTED//
        this.routerVar.get('/customers',(req,res,next)=>{
            res.send("below is the list of customers trying to contact...");
        });

        //Show past customers.
        //PROTECTED//
        this.routerVar.get('/history',(req,res,next)=>{
            res.send("below is the list of past customers..");
        });

    }

    getRouter() {
        return this.routerVar;
    }
}