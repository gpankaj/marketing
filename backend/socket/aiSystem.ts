/**
 * Created by pg942665 on 5/22/2017.
 */

var apiai = require('apiai');

export class AiSystem{
    static appclient:any;
    constructor(){
        AiSystem.appclient = apiai("be33d656261e4d3c9a8cd38d17f3a610");
    }


    //Sends data to AI and get's its response.
    getResponseFromAi(data:any, sessionId:String){
        var ai_request = AiSystem.appclient.textRequest(data.html, {
            sessionId: sessionId
        });

        ai_request.on('response', function (response:any) {
            console.log(JSON.stringify(response));
            let message = {
                //script: script,
                html: response.result.fulfillment.speech,
                confidence: 10,
                output: response,
                category: 'jenkins',
                username: '',
                date: new Date(),
                replied_by: 'bot'
            };
            //socket.emit('botReply', message);
            return message;
        });

    }


}