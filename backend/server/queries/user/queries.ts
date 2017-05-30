/**
 * Created by pg942665 on 5/8/2017.
 */

import {Request, Response} from "express";
import * as _ from 'lodash';
import {onErrorRuntime} from "../../handlers/onerror";
import {onSuccess} from "../../handlers/onsuccess";
import {user} from "../../model/user";






export class Query{
    constructor(){}

    findUserById(id:any,req :Request,res:Response) {
        user.findById(id)
            .then(_.partial(onSuccess,res,"User By Id"))//result will be automatically passes in addition to res to onSuccess(res,data)
            //We are passing 2 arguments to onError because it will be called automatically with 3rd argument.
            .catch(_.partial(onErrorRuntime,res,"Find user by Id failed."));
    }

    findUserByEmail(email:String,id:string, req:Request, res: Response){
        user.findOne({email:email})
            .then(_.partial(onSuccess,res,"User By Email")) //result will be automatically passes in addition to res to onSuccess(res,data)
            .catch(_.partial(onErrorRuntime,res,"Find user by Email failed."));
    }

}