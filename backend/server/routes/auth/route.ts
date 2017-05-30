/**
 * Created by pg942665 on 5/10/2017.
 */


import {Application, Router} from "express";
import * as express from 'express';
import {ServerConfig} from "../../config/server";
import {hashPassword, user} from "../../model/user";
import {Passport} from "passport";
const bcrypt = require('bcryptjs');

import {throws} from "assert";

const jwt = require('jsonwebtoken');

export class AuthRouter{
    routerVar:Router = express.Router();
    googlePassport:Passport;
    jwtPassport:Passport;
    passport = ServerConfig.passport;

    constructor() {

        console.log("Constructor called");


        //TOKEN AUTH - JWT START
        this.routerVar.get('/profile',ServerConfig.passport.authenticate('jwt',{session:false}),(req,res,next)=>{
            res.status(200).json({user: req.user})
        });


        this.routerVar.post('/authenticate',(req,res,next)=>{

            user.findOne({email:req.body.email},(err:any,userObj:any)=>{
                if (err) throw err;
                console.log(userObj);
                if(!userObj) {
                    res.status(200).json({success:false,msg: "User not found"})
                    res.end();
                    return;
                }
                bcrypt.compare(req.body.password, userObj.passwordHash,(err:any,matched:Boolean)=>{
                    if(matched) {
                        let token = jwt.sign(userObj,"secret",{
                            expiresIn: 604800 //1 week
                        });

                        res.status(200).json({success: true, token: 'JWT ' + token, user: userObj , msg: "Password Matched!"});
                        res.end();
                        return;
                    } else {
                        res.status(200).json({success: false, msg: "Password does not match"});
                        res.end();
                        return;
                    }
                })
            })
        });

        this.routerVar.post('/register',(req,res,next)=>{
            let that = this;
            if(!req.body.email) {
                res.status(500).json({success: false, msg: " Must to specify Email id"});
            }

            user.findOne({ email: req.body.email },
                function (err:Error, existingUser:any) {
                    if(err) {
                        console.log("DB error in fetching record " , err);
                        res.status(500).json({status:'failed'});
                    } else if( existingUser) {
                        res.status(200).json({success:'warning', msg: "User Already Registered "});
                    }

                    if(!existingUser) {
                        hashPassword(req.body.password, (err:any,hash:String)=>{
                            if(err) throw err;
                            let newUser = new user({
                                email: req.body.email,
                                passwordHash: hash
                            });
                            newUser.save((err:any,count:number)=>{
                                if (err) res.status(500).json({success: false, msg: " Failed to save user details to database"});
                                res.status(200).json({success: true, msg: "Successfully registered the user!"});
                            })
                        })
                    }
            });
            console.log("Response " , req.body);
        });
    }



    getRouter() {
        return this.routerVar;
    }
}