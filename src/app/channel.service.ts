import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChannelService {

	private socket:any=io('http://localhost:3000');

	constructor() { }
	accesChannel(){
		let observerAccesChannel = new Observable((observer) => {
			this.socket.on('accesChannel',() =>{
				console.log("acces true");
				observer.next();
			});
		});
		return observerAccesChannel;
	}

	listChannel(){
		let observerListChannel = new Observable((observer) => {
			this.socket.on('listChannel',(listChannel) =>{
				console.log("list channel");
				observer.next(listChannel);
			});
		});
		return observerListChannel;

	}
	callListChannel(){
		this.socket.emit('callListChannel');
	}
	createChannel(nameChannel){
		this.socket.emit('createChannel',nameChannel);
	}
	statusCreateChannel(){
		let observerStatusCreateServer=new Observable((observer)=>{
			this.socket.on('statusCreateChannel',(status)=>{
				observer.next(status);
			});
		});
		return observerStatusCreateServer;
	}
	callJoinChannel(channelName : string )
	{
		this.socket.emit('joinChannel',channelName);
	}
	accessJoinChannel(){
		let observerAccesJoinChannel= new Observable((observer)=>{
			this.socket.on('accesJoinChannel',(accessJoinChannel)=>{
				console.log(accessJoinChannel);
				observer.next(accessJoinChannel);

			})

		});
		return observerAccesJoinChannel;
	}

	

}
