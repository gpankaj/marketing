import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  conversation =[];
  message : string = '';
  socket = null;

  constructor() { }

  ngOnInit() {
    this.scrollToBottom();
    this.scrollToBottom();
    this.socket = io.connect('http://localhost:8080',()=>console.log);
    this.socket.on('botReply',function(data){
      console.log(data.script);
      //this.conversation.push(data.message.html);
      this.conversation.push(data);
    }.bind(this));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();

  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  send(){

    let message_obj = {
      category: 'jenkins',
      username: '',
      date: "",
      replied_by: 'user',
      html :this.message
    }

    this.socket.emit('newMessage',message_obj);

    //console.log("Converting " , this.message)
    this.conversation.push(message_obj);
    this.message="";
  }


  keypressHandler(event) {
    if (event.keyCode === 13){
      this.send();
    }
  }

}
