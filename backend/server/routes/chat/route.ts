/**
 * Created by pg942665 on 5/3/2017.
 */
import {Application, Router} from "express";
import * as express from 'express';



export class ChatRouter{
    routerVar:Router = express.Router();

    constructor() {
        this.routerVar.get('/',(req,res,next)=>{
            res.send("CHAT");
        });


        this.routerVar.get('/history',(req,res,next)=>{
            res.send("CHAT - HISTORY");
        });
    }

    getRouter() {
        return this.routerVar;
    }
}