/**
 * Created by pg942665 on 5/28/2017.
 */
import * as del from 'del';
import * as Loki from 'lokijs';
import {resolve} from "q";
import * as multer from 'multer';
import * as fs from 'fs';




export class Utils {
    static DB_NAME:String = 'db.json';
    static COLLECTION_NAME = 'images';
    static UPLOAD_PATH = 'uploads';
    static upload = multer({ dest: `${Utils.UPLOAD_PATH}/` }); // multer configuration
    static db = new Loki(`${Utils.UPLOAD_PATH}/${Utils.DB_NAME}`, { persistenceMethod: 'fs' });

    constructor(){

    }

    static loadCollection() {
        return new Promise(function (fulfill:any, reject:any){
            Utils.db.loadDatabase({}, () => {
                const _collection = Utils.db.getCollection(Utils.COLLECTION_NAME) || Utils.db.addCollection(Utils.COLLECTION_NAME);
                fulfill(_collection);
            })
        });
    }
}