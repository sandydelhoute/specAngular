import { Component, Input } from '@angular/core';
import { TchatService } from '../service/Tchat.service';
import * as io from "socket.io-client";

@Component({
  selector: 'tchat',
  templateUrl: './tchat.html',
  styleUrls: ['./tchat.css'],
  providers : [TchatService]

})
export class Tchat  {
	@Input() player:any;
	@Input() channel:any;
	private socket:any=io('http://localhost:3000');
	private listmessages = new Array;
	constructor(private tchatService : TchatService){}


	ngOnInit(){
		this.tchatService.receiveMessage().subscribe((message:any)=>{

			this.listmessages.unshift(message.message);
		});
	}
	submitMessage(text:String,errorMessage:HTMLElement){

		if(typeof text != 'undefined' && text != ''){ //function empty ?

			errorMessage.classList.add('hidden');

			let message = {
				player	: this.player.name,
				text	: text,
				date	: new Date(),
				role	: this.player.role
			};
			this.tchatService.sendMessage(message,this.channel);		
		} else {

			errorMessage.classList.remove('hidden');

		}
	}

}
