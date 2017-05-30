/**
 * Created by pg942665 on 5/3/2017.
 */
import {Application, Router} from "express";
import * as express from 'express';
import {ServerConfig} from "../../config/server";
import {Bot} from "../../model/bot";



export class BotBasicRouter{
    routerVar:Router = express.Router();

    constructor() {

        this.routerVar.post('/',ServerConfig.passport.authenticate('jwt',{session:false}),(req,res,next)=>{
            if(!req.body.name) {
                res.status(200).json({status: 'error', message: " Must to specify Email id"});
            }
            console.log("Request as it came ", JSON.stringify(req.user));
            Bot.findOne({ name: req.body.name },
                function (err:Error, result:any) {
                    if(err) {
                        console.log("DB error in fetching record " , err);
                        res.status(200).json({message:'failed to find data from database ' + err, status: 'error'});
                    }
                    if(!result) {

                        let newBot = new Bot({
                            name: req.body.name,
                            description: req.body.description,
                            category: req.body.category,
                            subcategory: req.body.subcategory,
                            createdBy: req.user._id
                        });
                        newBot.save((err:any,save_data:any)=>{
                            if (err) res.status(200).json({success: 'error', message: " Failed to save user details to database" + err, save_id:save_data._id});
                            res.status(200).json({success: 'success', message: "Successfully created new Bot!"});
                        })
                    } else {
                        res.status(200).json({success: 'false', message: "Bot with this name already exists"});
                    }
                });
            console.log("Response " , req.body);
        });



        this.routerVar.get('/:botid',(req,res,next)=>{
            if(!req.params.botid) {
                res.status(200).json({status: 'error', message: " Must to specify bot id "});
            }

            Bot.find({bot: req.params.botid},
                function (err:Error, result:any) {
                    if(err) {
                        console.log("DB error in fetching record " , err);
                        res.status(200).json({message:'failed to find data from database ' + err, status: 'error'});
                    }
                    if(!result) {
                        res.status(200).json({success: 'success', message: "There is no rule with this ID " + req.params.botid});
                    } else {
                        res.status(200).json({success: 'success', message: "Rules for Bot id : " +  req.params.botid,
                            result : JSON.stringify(result)
                        });
                    }
                });
        });


    }

    getRouter() {
        return this.routerVar;
    }
}