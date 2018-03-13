import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Player} from "../Model/Player";
import {Channel} from "../Model/Channel";

@Injectable()
export class LoginService {
	private socket:any=io('http://localhost:3000');
	constructor() { }

	errorPlayer(){
		let observerErrorPlayer = new Observable(observer => {
			this.socket.on('errorPlayer',(msgError)=>{
				observer.next(msgError);
			});

		});
		return observerErrorPlayer;
	}
	createPlayer(player:Player){
		this.socket.emit('createPlayer',player);
	}
	getPlayer(playerId,channel:Channel = null){
		if(channel !== null )
		{
			this.socket.emit('getPlayer',playerId,channel);
		}
		else
		{
			this.socket.emit('getPlayer',playerId);
		}
	}
	setPlayer(){
		let OberserSetPlayer = new Observable( observer => {
			this.socket.on('setPlayer',(playerInput:Player)=>{
				observer.next(Player.fromJson(playerInput));
			});
		});
		return OberserSetPlayer;
	}
}
