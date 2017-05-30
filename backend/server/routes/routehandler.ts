
/**
 * Created by pg942665 on 5/8/2017.
 */


//Register all routes here...

import {ChatRouter} from "./chat/route";


import {ServerConfig} from "../config/server";
import {Application} from "express";
import {EstablishmentRouter} from "./establishment/route";
import {CustomerRouter} from "./customer/route";
import {ServiceProviderRoute} from "./serviceprovider/route";
import {BotRoute} from "./serviceprovider/bot/route";
import {AuthRouter} from "./auth/route";
import * as path from "path";
import {WrongRoute} from "./wrongroute/route";
import {BotRulesRouter} from "./botrules/route";
import {BotBasicRouter} from "./bot/route";





export class RouteHandler{
    app:Application = ServerConfig.getApp();

    constructor(){
        this.app.use('/chat',new ChatRouter().getRouter());
        this.app.use('/customers',new CustomerRouter().getRouter());
        this.app.use('/establishment', new EstablishmentRouter().getRouter());
        this.app.use('/owner', new ServiceProviderRoute().getRouter());
        this.app.use('/bot', new BotBasicRouter().getRouter());
        this.app.use('/rule', new BotRulesRouter().getRouter());
        this.app.use('/', new AuthRouter().getRouter());
        this.app.use('/*', new WrongRoute().getRouter());
        //this.app.use('*', (req,res)=>{res.sendFile(path.join(__dirname,'/../public/index.html'))})
    }

    getApp(){
        return this.app;
    }


}