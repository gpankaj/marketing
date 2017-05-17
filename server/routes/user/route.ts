/**
 * Created by pg942665 on 5/10/2017.
 */


import {Application, Router} from "express";
import * as express from 'express';
import {ServerConfig} from "../../config/server";

const jwt = require('jsonwebtoken');


export class AuthRouter{
    routerVar:Router = express.Router();

    constructor() {

    }

    getRouter() {
        return this.routerVar;
    }
}