/**
 * Created by pg942665 on 5/4/2017.
 */

export class MyConfig{
    //dbUrl : string = 'mongodb://localhost:27017/meanauth';
    dbUrl : string = 'mongodb://admin:admin@ds119750.mlab.com:19750/onanai';
    secretKey : string = 'secret';

    constructor() {
    }

    getdbUrl (){
        return this.dbUrl;
    }

    getsecretKey() {
        return this.dbUrl;
    }
}
