/**
 * Created by pg942665 on 5/8/2017.
 */

import {Application, NextFunction, Request, Response} from "express";
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from "body-parser";
const passport = require('passport');
const cors = require('cors');
import {Passport} from "passport";


export class ServerConfig{
    private static port : number = process.env.PORT || 8080;
    private static app:Application = express();

    static passport = require('passport');

    constructor() {

    }

    static getPort (){
        return ServerConfig.port;
    }

    static getApp(){
        //Body Parser
        ServerConfig.app.use(bodyParser.json());

        //Allow cross site request because angular runs on different port than backend.
        ServerConfig.app.use(cors());
        //Set Static folder
        ServerConfig.app.use(express.static(path.join(__dirname,'../public')));

        ServerConfig.app.use(passport.initialize());
        ServerConfig.app.use(passport.session());
        require('./jwt').getJwtPassport(passport);
        require('./google').getGooglePassport(passport);

        return ServerConfig.app;
    }

    static errorHandler(error:any, req:Request,res:Response,next:NextFunction){

        console.log("ERROR: ", error);

        res.status(500).json({errorCode: '001', message: 'Internal Server Error'});
        res.end();

    }
}


