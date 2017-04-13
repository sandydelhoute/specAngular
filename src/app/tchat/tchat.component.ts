import { Component, Input } from '@angular/core';

import * as io from "socket.io-client";

@Component({
  selector: 'tchat',
  templateUrl: './tchat.html',
  styleUrls: ['./tchat.css'],

})
export class Tchat  {
	@Input() player:any;
	private socket:any=io('http://localhost:3000');
	private listmessages = new Array;


	submitMessage(text:string, errorMessage:HTMLElement){

		if(typeof text != 'undefined' && text != ''){ //function empty ?

			errorMessage.classList.add('hidden');

			let message = {
				player	: this.player.name,
				text	: text,
				date	: new Date(),
				role	: this.player.role
			};
			this.socket.emit('addmessage',text);
			this.listmessages.push(message);

		} else {

			errorMessage.classList.remove('hidden');

		}

	}


}
