import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class PartieService {

  private socket:any=io('http://localhost:3000');	
  constructor() { }
  getChannel(channelName){
  	this.socket.emit('getChannel',channelName);
  }
  setChannel(){
  		let ObservateSetChannel = new Observable((observer)=>{
  			this.socket.on('setChannel',(channel)=>{
  				observer.next(channel);
  			});

  		});
  	return ObservateSetChannel;
  }


  setReady(userName,ChannelName){
    this.socket.emit('setReady',userName,ChannelName);
  }
  
  callLaunchGame(ChannelName){
      console.log("je suis dans le  callLaunchGame");
     this.socket.emit('callLaunchGame',ChannelName);
   }

   launchGame(){
       let ObservableLaunGame = new Observable ((observer)=>{
           this.socket.on('launchGame',(launchGameStatus)=>{
               observer.next(launchGameStatus);
           });
       });
   }


   

}
