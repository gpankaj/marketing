/**
 * Created by pg942665 on 5/8/2017.
 */

import {NextFunction, Request, Response} from "express";
const hri = require('human-readable-ids').hri;

export function onErrorRuntime(res:Response, message:String, error:any){
    const id = hri.random();

    console.error("Promise Chain error ", message,error , " ID " , id);
    res.status(500).json({errorCode: '002', message: message, error: error.message, id: id});
}


//error:any, req:Request,res:Response,next:NextFunction

export function onErrorMiddleware(error:any, req:Request,res:Response,next:NextFunction){
    const id = hri.random();
    console.log("ERROR: ", error , " ID ", id);
    res.status(500).json({errorCode: '001', message: 'Internal Server Error', error: error.message, id: id});
}