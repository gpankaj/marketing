/**
 * Created by pg942665 on 5/8/2017.
 */


import {Application} from "express";
import * as express from 'express';
import {Router} from "express";
import {Query} from "../../queries/establishment/queries";
import {stringify} from "querystring";
import * as mongoose from "mongoose";
import {onErrorRuntime} from "../../handlers/onerror";
import {establishment} from "../../model/establishment";


export class EstablishmentRouter{
    routerVar:Router = express.Router();
    est = new Query();

    constructor() {

        this.routerVar.post('/',(req,res,next)=>{
            this.est.createEstablishment(req,res);
        });

        this.routerVar.get('/',(req,res,next)=>{
            res.send("Establishment Index");
        });

        this.routerVar.get('/history',(req,res,next)=>{
            res.send("History inside Establishment");

        });



        this.routerVar.get('/list',(req,res,next)=>{
            //TEST - throw new Error("Error occured..")
            console.log("Finding all the establishments .. ");
            this.est.findAllEstablishments(req,res);
        });

        this.routerVar.get('/list/:id',(req,res,next)=>{

            let id = req.params.id;
            //throw new Error("Error occured..")
            if(mongoose.Types.ObjectId.isValid(id)) {
                this.est.findEstablishmentById(id, req, res);
            } else {
                onErrorRuntime(res,"No such id ",id);
            }
        });


        this.routerVar.patch('/:id',(req,res,next)=>{

            let id = req.params.id;
            // TEST - throw new Error("Error occured..")

            if(mongoose.Types.ObjectId.isValid(id)) {
                this.est.updateEstablishment(req, res);
            } else {
                onErrorRuntime(res,"No such id ",id);
            }
        });

        this.routerVar.delete('/:id',(req,res,next)=>{

            let id = req.params.id;
            // TEST - throw new Error("Error occured..")

            if(mongoose.Types.ObjectId.isValid(id)) {
                this.est.deleteEstablishment(req, res);
            } else {
                onErrorRuntime(res,"No such id ",id);
            }
        });


    }

    getRouter() {
        return this.routerVar;
    }

}

//

