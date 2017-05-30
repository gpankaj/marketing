/**
 * Created by pg942665 on 5/8/2017.
 */


import {MyConfig} from "../config/database";

const passport = require('passport');
import * as mongoose from 'mongoose';
import * as Q from "q";
import {Mongoose} from "mongoose";

class DBConnect {
    static dbConfig = new MyConfig();

    static mongooseVar: Mongoose;
    constructor(){

    }

    static getMongoose():Mongoose{
        //Connect to database
        DBConnect.mongooseVar = mongoose.connect(DBConnect.dbConfig.getdbUrl());

        (<any>DBConnect.mongooseVar).Promise = Q.Promise;

        DBConnect.mongooseVar.connection.on('connected',()=>{
            console.log("Connected to ", DBConnect.dbConfig.getdbUrl());
        });

        DBConnect.mongooseVar.connection.on('error',(err:any)=>{
            console.log("Database error ", err);
        });
        return DBConnect.mongooseVar;
    }
}

export const mymongoose:Mongoose =  DBConnect.getMongoose();