/**
 * Created by pg942665 on 5/22/2017.
 */

import {AiSystem} from './aiSystem';
import {ServerConfig} from "../server/config/server";

const server = ServerConfig.getServer();




export class HandleChatConnection{

    static connections:any = [];
    static connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
    };

    static io = require('socket.io').listen(server,HandleChatConnection.connectionOptions);


    constructor(){



        HandleChatConnection.io.sockets.on('connection',function (socket:any) {

            HandleChatConnection.connections.push(socket.id);

            console.log("Connected %s sockets connected ", this.connections.length);
            console.log("Socket name " , socket.name);
            console.log("Socket id " , socket.id);

            //Disconnect
            socket.on('disconnect',function (data:any) {
                socket.disconnect();
                console.log("Data " , data);
                this.connections.splice(this.connections.indexOf(socket.id), 1);
                console.log('Disconnected %s sockets connected',this.connections.length);
            });


            //Message Handling
            socket.on('newMessage',function (data:any) {
                console.log("Client said ", data);
                let user_said = JSON.stringify(data);

                let script = "function runIt() {" +
                    "console.log('Clicked');}";


                console.log("User said: " , data.html);

                //Parse Data Locally.


                let aiSystem = new AiSystem();
                //Send the user message to AI system.
                var ai_request = AiSystem.appclient.textRequest(data.html, {
                                  sessionId: 'pankajg'
                              });


                console.log("Sending request to API...");

                //Response from AI
                aiSystem.getResponseFromAi(data.html, "pankajg");

            });

        });
    }
}