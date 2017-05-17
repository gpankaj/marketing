/**
 * Created by pg942665 on 5/4/2017.
 */

export class MyConfig{
    dbUrl : string = 'mongodb://localhost:27017/meanauth';
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