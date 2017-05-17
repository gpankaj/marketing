/**
 * Created by pg942665 on 5/8/2017.
 */

import {establishment} from "../../model/establishment";
import {Request, Response} from "express";
import * as _ from 'lodash';
import {onErrorRuntime} from "../../handlers/onerror";
import {onSuccess} from "../../handlers/onsuccess";
import * as mongoose from "mongoose";





export class Query{
    constructor(){}

    findAllEstablishments(req :Request,res:Response) {
        establishment.find()
        .then(_.partial(onSuccess,res,"All Establishment"))//result will be automatically passes in addition to res to onSuccess(res,data)
        //We are passing 2 arguments to onError because it will be called automatically with 3rd argument.
        .catch(_.partial(onErrorRuntime,res,"Find of all establishments failed."));
    }

    findEstablishmentById(id:string, req:Request, res: Response){
        establishment.findById(id)
            .then(_.partial(onSuccess,res,"Single Establishment")) //result will be automatically passes in addition to res to onSuccess(res,data)
            .catch(_.partial(onErrorRuntime,res,"Find of Single Establishment failed."));
    }

    createEstablishment(req:Request,res:Response){
        let newEst = new establishment(req.body);
        //save model to MongoDB
        newEst.save()
            .then(_.partial(onSuccess,res,"Successfully created Establishment"))
            .catch(_.partial(onErrorRuntime,res,"Failed to create Establishment."));
    }

    updateEstablishment(req:Request, res:Response){
        establishment.findOneAndUpdate({_id:req.params.id},req.body)
            .then(_.partial(onSuccess,res,"Successfully updated Establishment"))
            .catch(_.partial(onErrorRuntime,res,"Failed to update Establishment."));
    }


    deleteEstablishment(req:Request, res:Response){
        establishment.remove({_id:mongoose.Types.ObjectId(req.params.id)})
            .then(_.partial(onSuccess,res,"Successfully updated Establishment"))
            .catch(_.partial(onErrorRuntime,res,"Failed to update Establishment."));
    }
}
