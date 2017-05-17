
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





export class RouteHandler{
    app:Application = ServerConfig.getApp();

    constructor(){
        this.app.use('/chat',new ChatRouter().getRouter());
        this.app.use('/customer',new CustomerRouter().getRouter());
        this.app.use('/establishment', new EstablishmentRouter().getRouter());
        this.app.use('/owner', new ServiceProviderRoute().getRouter());
        this.app.use('/bot', new BotRoute().getRouter());
        this.app.use('/', new AuthRouter().getRouter());
    }

    getApp(){
        return this.app;
    }


}