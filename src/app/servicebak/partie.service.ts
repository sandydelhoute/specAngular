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

 
  callLaunchGame(ChannelName:String){
     this.socket.emit('callLaunchGame',ChannelName);
   }

   launchGame(){
       let ObservableLaunchGame = new Observable ((observer)=>{
           this.socket.on('launchGame',(channel)=>{
               observer.next(channel);
           });
       });
       return ObservableLaunchGame;
   }


   

}
