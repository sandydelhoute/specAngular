import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class TchatService {

  private socket:any=io('http://localhost:3000');
  receiveMessage(){
  	  let ObservateReceiveMessage = new Observable((observer)=>{
  			this.socket.on('newmessage',(mesage)=>{
  				observer.next(mesage);
  			});

  		});
  	return ObservateReceiveMessage;
  }

  sendMessage(message,channel){
  	this.socket.emit('addmessage',message,channel);
  }

}