import {Response} from "express";
/**
 * Created by pg942665 on 5/9/2017.
 */


export function onSuccess(res:Response,message:String,data:any){
     res.status(201).json({message: message, payload: data});
}