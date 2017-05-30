/**
 * Created by pg942665 on 5/4/2017.
 */
import {Application, Router} from "express";
import * as express from 'express';




export class BotRoute{
    routerVar:Router = express.Router();

    constructor() {
        //Only service Provider can login to this.
        this.routerVar.get('/autheticate',(req,res,next)=>{
            res.send("AUTHENTICATE");
        });

        //If logged in
        //Show all the rules.
        //PROTECTED//
        this.routerVar.get('/train',(req,res,next)=>{
            res.send("Train the Boat");
        });


        // A rule is
        //define regex
        //define condition - match / not-match etc.
        //define action - reply text/picture/call API and reply etc.

        this.routerVar.post('/addRule',(req,res,next)=>{
            res.send("AddRule");
        });

        this.routerVar.post('/modifyRule',(req,res,next)=>{
            res.send("Modify Rule");
        });

        this.routerVar.post('/deleteRule',(req,res,next)=>{
            res.send("DeleteRule");
        });
    }

    getRouter() {
        return this.routerVar;
    }
}