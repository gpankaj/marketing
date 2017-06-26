/**
 * Created by pg942665 on 6/23/2017.
 */
'use strict';

const Restify = require('restify');

const server = Restify.createServer({
    name: "fulfilment"
});

const PORT = process.PORT || 5000;

server.use(Restify.bodyParser());
server.use(Restify.jsonp());


//Route Handlers
server.post('/', (req,res,next)=>{

    let  {status, result} = req.body;

    console.log(result);
    return next();
});

server.get('/', (req,res,next)=>{
    console.log("Received " , JSON.stringify(req.parameters));
    return next();
});



server.listen(PORT,'0.0.0.0',()=>{
    console.log("Server listening on " , PORT);
})