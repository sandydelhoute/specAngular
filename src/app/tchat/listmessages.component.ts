import { Component, Input } from '@angular/core';
import { Message } from "../Model/Message";

@Component({
  selector: 'listMessages',
  templateUrl: './listMessages.html',
  styleUrls:['./listMessages.css']

})
export class ListMessages  {
	@Input() message:Message;

	constructor(){
	}

}
