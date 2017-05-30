/**
 * Created by pg942665 on 5/3/2017.
 */
import {Application, Response, Router} from "express";
import * as express from 'express';
import {ServerConfig} from "../../config/server";
import {Utils} from "../../config/utils";
import {BotRule} from "../../model/botrule";
import Request = Express.Request;


export class BotRulesRouter{
    routerVar:Router = express.Router();

    constructor() {


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

        /* List a rule by it's object id
        *
        *
        * */
        this.routerVar.get('/:ruleid',(req,res,next)=>{
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


        /* List all the rules
        *
        *
        * */
        this.routerVar.get('/all',(req,res,next)=>{

            BotRule.find({},
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

        /* List rule by bot id
        * */

        this.routerVar.get('/bot/:botid',(req,res,next)=>{
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

    }

    getRouter() {
        return this.routerVar;
    }
}