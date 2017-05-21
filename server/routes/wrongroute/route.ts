/**
 * Created by pg942665 on 5/21/2017.
 */


import {Application, Router} from "express";
import * as express from 'express';
import {ServerConfig} from "../../config/server";
import * as path from "path";


export class WrongRoute{
    routerVar:Router = express.Router();

    constructor(private router:Router) {
        this.routerVar.get('',(req,res,next)=>{
            //res.send("hello")
            res.redirect('index\.html');
            //res.sendFile(__dirname,'/../../index.html')
            //res.sendFile(path.join(__dirname,'/../../public/index.html'));
        });
    }

    getRouter() {
        return this.routerVar;
    }
}