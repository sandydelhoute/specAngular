import { Component, Input } from '@angular/core';
import { TchatService } from '../service/Tchat.service';
import * as io from "socket.io-client";
import { Player } from "../Model/Player";
import { Channel } from "../Model/Channel";
import { Message } from "../Model/Message";

@Component({
  selector: 'tchat',
  templateUrl: './tchat.html',
  styleUrls: ['./tchat.css'],
  providers : [TchatService]

})
export class Tchat  {
	@Input() player:Player;
	@Input() channel:Channel;
	constructor(private tchatService : TchatService){
	}
	ngOnInit(){

		this.tchatService.receiveMessage().subscribe((message:Message)=>{
			//this.channel.getListMessageAll().addListMessageAll(message);
		});
	}

	submitMessage(text:string,errorMessage:HTMLElement){

		if(typeof text != 'undefined' && text != ''){ 
			errorMessage.classList.add('hidden');
			let message = new Message();
			message.setPlayer(this.player);
			message.setTextContent(text);
			message.setDatePublish(new Date());
			this.tchatService.sendMessage(message,this.channel);		
		} else {

			errorMessage.classList.remove('hidden');

		}
	}

}
