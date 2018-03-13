import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Player }from "../Model/Player";
import {Channel } from "../Model/Channel";
@Injectable()
export class ChannelService {

	private socket:any=io('http://localhost:3000');

	constructor() { }
	accesChannel(){
		let observerAccesChannel = new Observable((observer) => {
			this.socket.on('accessJoinChannel',(status:any) =>{
				observer.next(status);
			});
		});
		return observerAccesChannel;
	}

	listChannel(){
		let observerListChannel = new Observable((observer) => {
			this.socket.on('listChannel',(listChannel) =>{
				observer.next(Channel.fromJsonList(listChannel));
			});
		});
		return observerListChannel;

	}
	callListChannel(){
		this.socket.emit('callListChannel');
	}
	createChannel(channel:Channel,player:Player){
			this.socket.emit('createChannel',channel,player);
	}
	
	statusCreateChannel(){
		let observerStatusCreateServer=new Observable((observer)=>{
			this.socket.on('statusCreateChannel',(status)=>{
				observer.next(status);
			});
		});
		return observerStatusCreateServer;
	}

	JoinChannel(channelName : string,player:Player)
	{
		this.socket.emit('joinChannel',channelName,player);
	}

  getChannel(channelName){
  	this.socket.emit('getChannel',channelName);
  }


  setChannel(){
  		let ObservateSetChannel = new Observable((observer)=>{
  			this.socket.on('setChannel',(channel)=>{
  				observer.next(Channel.fromJson(channel));
  			});

  		});
  	return ObservateSetChannel;
  }
  updateChannel(){
  	let ObservateUpdateChannel = new Observable((observer)=>{
  			this.socket.on('updateChannel',(channel)=>{
  				observer.next(channel);
  			});

  		});
  	return ObservateUpdateChannel;
  }
  AllReady(){
  	 let ObservateAllReady = new Observable((observer)=>{
  			this.socket.on('allReady',(channel)=>{
  				observer.next(channel);
  			});

  		});
  	return ObservateAllReady;
  }
  setReady(player:Player,channel:Channel){
    this.socket.emit('setReady',player,channel);
  }
}
