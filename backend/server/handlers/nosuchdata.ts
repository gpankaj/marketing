/**
 * Created by pg942665 on 5/9/2017.
 */


import {NextFunction, Request, Response} from "express";
const hri = require('human-readable-ids').hri;

export function noSuchData(res:Response, message:String, error:any){
    const id = hri.random();
    console.error("No such data ", message,error, " ID ", id);
    res.status(500).send({error: error, id: id});
}