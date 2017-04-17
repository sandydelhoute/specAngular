import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChannelService {

	private socket:any=io('http://localhost:3000');

	constructor() { }
	accesChannel(){
		let observerAccesChannel = new Observable((observer) => {
			this.socket.on('accesChannel',(user) =>{
				observer.next(user);
			});
		});
		return observerAccesChannel;
	}

	listChannel(){
		let observerListChannel = new Observable((observer) => {
			this.socket.on('listChannel',(listChannel) =>{
				observer.next(listChannel);
			});
		});
		return observerListChannel;

	}
	callListChannel(){
		this.socket.emit('callListChannel');
	}
	createChannel(nameChannel:string,userName){
		if(nameChannel != ''){
			this.socket.emit('createChannel',nameChannel,userName);
		} else return null;
	}
	statusCreateChannel(){
		let observerStatusCreateServer=new Observable((observer)=>{
			this.socket.on('statusCreateChannel',(status)=>{
				observer.next(status);
			});
		});
		return observerStatusCreateServer;
	}
	JoinChannel(channelName : string,userName)
	{
		this.socket.emit('joinChannel',channelName,userName);
	}

}
