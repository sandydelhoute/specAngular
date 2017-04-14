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
  				console.log("je suis dans le setChannel");
  				observer.next(channel);
  			});

  		});
  	return ObservateSetChannel;
  }
    getPlayer(){
      let ObservateGetPlayer = new Observable((observer)=>{
        this.socket.on('getPlayer',(listPlayer)=>{
          observer.next(listPlayer);
        });

      });
    return ObservateGetPlayer;
  }

}
