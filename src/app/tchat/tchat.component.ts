import { Component, Input } from '@angular/core';

@Component({
  selector: 'tchat',
  templateUrl: './tchat.html',
  styleUrls: ['./tchat.css'],

})
export class Tchat  {
	@Input() role:any;
	@Input() player:any;

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

			this.listmessages.push(message);

		} else {

			errorMessage.classList.remove('hidden');

		}

	}


}
