import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class PartieService {

  private socket:any=io('http://localhost:3000');	
  constructor() { }
  getListUser(channelName){
  	console.log(channelName);
  	this.socket.emit('getListUser',channelName);
  }
  setListUser(){
  		let ObservateSetMaster = new Observable((observer)=>{
  			this.socket.on('setListUser',(listUser)=>{
  				observer.next(listUser);
  			});

  		});
  	return ObservateSetMaster;
  }


}
