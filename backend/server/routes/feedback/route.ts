/**
 * Created by pg942665 on 5/3/2017.
 */
import {Application, Router} from "express";
import * as express from 'express';
import {ServerConfig} from "../../config/server";
import {bot} from "../../model/bot";



export class BotRulesRouter{
    routerVar:Router = express.Router();

    constructor() {



        this.routerVar.get('/history',(req,res,next)=>{
            res.send("CHAT - HISTORY");
        });



        this.routerVar.post('/',ServerConfig.passport.authenticate('jwt',{session:false}),(req,res,next)=>{
            if(!req.body.name) {
                res.status(200).json({status: 'error', message: " Must to specify Email id"});
            }

            bot.findOne({ name: req.body.name },
                function (err:Error, result:any) {
                    if(err) {
                        console.log("DB error in fetching record " , err);
                        res.status(200).json({message:'failed to find data from database ' + err, status: 'error'});
                    }
                    if(!result) {

                        let newBot = new bot({
                            name: req.body.name,
                            description: req.body.description,
                            category: req.body.category,
                            subcategory: req.body.subcategory

                        });

                        res.status(200).json({message:'warning', msg: "User Already Registered "});
                    }



                });
            console.log("Response " , req.body);
        });

    }

    getRouter() {
        return this.routerVar;
    }
}