/**
 * Created by pg942665 on 5/3/2017.
 */

import {ServerConfig} from "./config/server";
import {RouteHandler} from "./routes/routehandler";
import {onErrorMiddleware} from "./handlers/onerror";
import * as _ from 'lodash';
import {Request, Response} from "express";
import {HandleChatConnection} from "../socket/chat";


const port = ServerConfig.getPort();

const app = new RouteHandler().getApp();

//Below is error handler middleware,
//This middleware has to be used AFTER route definations.
//_.partial(onErrorRuntime,res,"Find of Single Establishment failed.")

app.use(onErrorMiddleware);


let chatConnection = new HandleChatConnection();

ServerConfig.getServer().listen(port, ()=>{
    console.log("Listening on ", port);
});


