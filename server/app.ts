/**
 * Created by pg942665 on 5/3/2017.
 */

import {ServerConfig} from "./config/server";
import {RouteHandler} from "./routes/routehandler";
import {onErrorMiddleware} from "./handlers/onerror";
import * as _ from 'lodash';
import {Request, Response} from "express";


const port = ServerConfig.getPort();

const app = new RouteHandler().getApp();

//Below is error handler middleware,
//This middleware has to be used AFTER route definations.
//_.partial(onErrorRuntime,res,"Find of Single Establishment failed.")

app.use(onErrorMiddleware);

app.listen(port, ()=>{
    console.log("Listening on ", port);
});




import { chatSchema } from "./model/chat";
import { botSchema } from "./model/bot";
import { customerSchema } from "./model/customer";
import { establishment } from "./model/establishment";
import { owner } from "./model/owner";
import * as path from "path";
/*
//create new model
let newOwner = new owner({name:"owner1",email:"owner1@gmail.com",phone:[1234567890,2214324324,21434324]});
newOwner.save((err)=>{
  if(err) {
      console.log("Error in saving newOnwer ", err);
  } else {
      console.log("Successfully saved newOwner ", newOwner);
  }
});
//create new model
let post = new establishment({name: "Restaurant 1", email: "res@gmail.com",
    phone: "+91 98452 04336", comment: "Opening Shortly"});

//save model to MongoDB
post.save(function (err) {
    if (err) {
        return err;
    }
    else {
        console.log("Post saved");
    }
});

*/

//findAllEstablishments().then(results=>console.log(JSON.stringify(results)));


