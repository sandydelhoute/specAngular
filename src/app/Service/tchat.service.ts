import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from "../Model/Message";
import * as io from 'socket.io-client';


@Injectable()
export class TchatService {

  private socket:any=io('http://localhost:3000');
  receiveMessage(){
  	  let ObservateReceiveMessage = new Observable((observer)=>{
  			this.socket.on('newmessage',(listMessageAll:Array<Message>)=>{
  				observer.next(listMessageAll);
  			});

  		});
  	return ObservateReceiveMessage;
  }

  sendMessage(message,channel){
  	this.socket.emit('addmessage',message,channel);
  }

}