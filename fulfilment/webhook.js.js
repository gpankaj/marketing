/**
 * Created by pg942665 on 6/23/2017.
 */
'use strict';
var Restify = require('restify');
var server = Restify.createServer({
    name: "fulfilment"
});
var PORT = process.PORT || 5000;
server.use(Restify.bodyParser());
server.use(Restify.jsonp());
//Route Handlers
server.post('/', function (req, res, next) {
    var _a = req.body, status = _a.status, result = _a.result;
    console.log(result);
    return next();
});
server.get('/', function (req, res, next) {
    console.log("Received ", JSON.stringify(req.parameters));
    return next();
});
server.listen(PORT, '0.0.0.0', function () {
    console.log("Server listening on ", PORT);
});
