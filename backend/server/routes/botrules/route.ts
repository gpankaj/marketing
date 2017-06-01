/**
 * Created by pg942665 on 5/3/2017.
 */
import {Application, Response, Router} from "express";
import * as express from 'express';
import {ServerConfig} from "../../config/server";
import {Utils} from "../../config/utils";
import {BotRule} from "../../model/botrule";
import Request = Express.Request;
import * as mongoose from "mongoose";


export class BotRulesRouter{
    routerVar:Router = express.Router();

    constructor() {

        /*
        * Create a new Bot rule
        *
        *
        *
        * */

        this.routerVar.post('/',ServerConfig.passport.authenticate('jwt',{session:false}),(req,res,next)=>{
            if(!req.body.id) {
                res.status(200).json({status: 'error', message: " Must to specify bot id "});
            }

                BotRule.findOne({ bot: req.body.id},
                    function (err:Error, result:any) {
                    if(err) {
                        console.log("DB error in fetching record " , err);
                        res.status(200).json({message:'failed to find data from database ' + err, status: 'error'});
                    }
                    if(!result) {
                        let newBotRule = new BotRule({
                            pattern: req.body.pattern,
                            condition: req.body.condition,
                            textResult: req.body.textresult,
                            createdBy: req.user._id,
                            bot: req.body.id
                        });

                        newBotRule.save((err:any,save_data:any)=>{
                            if (err) res.status(200).json({success: 'error', message: " Failed to save Bot Rules" + err,save_id:save_data._id});
                            res.status(200).json({success: 'success', message: "Successfully created new Bot Rule!"});

                        })
                    } else {
                        let newBotRule = new BotRule({
                            pattern: req.body.pattern,
                            condition: req.body.condition,
                            textResult: req.body.textresult,
                            createdBy: req.user._id,
                            bot: req.body.id
                        });

                        newBotRule.save((err:any,save_data:any)=>{
                            if (err) res.status(200).json({success: 'error', message: " Failed to save Bot Rules" + err});
                            res.status(200).json({success: 'success', message: "Successfully added new Bot Rule!"});
                        })
                    }
                });
        });

        /* List a rule by it's id
        *
        *localhost:8080/rule/59299236d9813d37b88f951d
        * */
        this.routerVar.get('/:ruleid',ServerConfig.passport.authenticate('jwt',{session:false}), (req,res,next)=>{
            if(!req.params.ruleid) {
                res.status(200).json({status: 'error', message: " Must to specify bot id "});
            }

            BotRule.findById(req.params.ruleid,
                function (err:Error, result:any) {
                    if(err) {
                        console.log("DB error in fetching record " , err);
                        res.status(200).json({message:'failed to find data from database ' + err, status: 'error'});
                    }
                    if(!result) {
                        res.status(200).json({success: 'success', message: "There is no rule with this ID " + req.params.ruleid});
                    } else {
                        res.status(200).json({success: 'success', message: "Rules for id : " +  req.params.ruleid,
                                                result : JSON.stringify(result)
                                            });
                    }
                });
        });

        /* Delete a rule given it's id
         *
         *localhost:8080/rule/59299236d9813d37b88f951d   (Make sure to select DELETE as REST API call)
         * */
        this.routerVar.delete('/:ruleid',ServerConfig.passport.authenticate('jwt',{session:false}), (req,res,next)=>{
            if(!req.params.ruleid) {
                res.status(200).json({status: 'error', message: " Must to specify bot id "});
            }

            BotRule.findByIdAndRemove(req.params.ruleid,
                function (err:Error, result:any) {
                    if(err) {
                        console.log("DB error in fetching record " , err);
                        res.status(200).json({message:'failed to find data from database ' + err, status: 'error'});
                    }
                    if(!result) {
                        res.status(200).json({success: 'success', message: "There is no rule with this ID " + req.params.ruleid});
                    } else {
                        res.status(200).json({success: 'success', message: "Deleted Successfully " +  req.params.ruleid,
                            result : JSON.stringify(result)
                        });
                    }
                });
        });


        /* Update a rule given it's id
         *
         *localhost:8080/rule/592992c86348ab2ac83710fd
         * {
            "pattern" : "***********",
            "condition": "Veg fun dine",
            "textResult": "IT"
         }
         * */
        this.routerVar.patch('/:ruleid',ServerConfig.passport.authenticate('jwt',{session:false}), (req,res,next)=>{
            if(!req.params.ruleid) {
                res.status(200).json({status: 'error', message: " Must to specify bot id "});
            }

            BotRule.findByIdAndUpdate(req.params.ruleid, req.body,
                function (err:Error, result:any) {
                    if(err) {
                        console.log("DB error in fetching record " , err);
                        res.status(200).json({message:'failed to find data from database ' + err, status: 'error'});
                    }
                    if(!result) {
                        res.status(200).json({success: 'success', message: "There is no rule with this ID " + req.params.ruleid});
                    } else {
                        res.status(200).json({success: 'success', message: "Updated Successfully " +  req.params.ruleid,
                            result : JSON.stringify(result)
                        });
                    }
                });
        });


        /* List all the rules created by me.
        *  localhost:8080/rule/
        *
        * */
        this.routerVar.get('/',ServerConfig.passport.authenticate('jwt',{session:false}), (req,res,next)=>{
            console.log("Req object ", JSON.stringify(req.user));
            BotRule.find({createdBy:req.user._id },
                function (err:Error, result:any) {
                    if(err) {
                        console.log("DB error in fetching record " , err);
                        res.status(200).json({message:'failed to find data from database ' + err, status: 'error'});
                    }
                    if(!result) {
                        res.status(200).json({success: 'success', message: "There is no rule "});
                    } else {
                        res.status(200).json({success: 'success', message: "Rules ",
                            result : JSON.stringify(result)
                        });
                    }
                });
        });

        /* List rule by bot id - list all the rules of a botid
        Example : localhost:8080/rule/bot/592923ff89083f47dcd41435
        * */

        this.routerVar.get('/bot/:botid',ServerConfig.passport.authenticate('jwt',{session:false}), (req,res,next)=>{
            if(!req.params.botid) {
                res.status(200).json({status: 'error', message: " Must to specify bot id "});
            }

            BotRule.find({bot: req.params.botid},
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

        /* Given a bot id and rule id display its details
        Example: localhost:8080/rule/bot/592923ff89083f47dcd41435/59299236d9813d37b88f951d
         * */
        this.routerVar.get('/bot/:botid/:ruleid', ServerConfig.passport.authenticate('jwt',{session:false}), (req,res,next)=>{
            if(!req.params.botid) {
                res.status(200).json({status: 'error', message: " Must to specify bot id "});
            }
            BotRule.find({bot: req.params.botid, _id: req.params.ruleid},
                function (err:Error, result:any) {
                    if(err) {
                        console.log("DB error in fetching record " , err);
                        res.status(200).json({message:'failed to find data from database ' + err, status: 'error'});
                    }
                    if(!result) {
                        res.status(200).json({success: 'success', message: "There is no rule with this ID " + req.params.botid});
                    } else {
                        res.status(200).json({success: 'success', message: "Rule for Bot id : " +  req.params.botid + " rule id: " + req.params.ruleid,
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