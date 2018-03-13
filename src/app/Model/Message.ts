import {Player} from "../Model/Player";

export class Message{
	
	private datePublish:Date;
	private textContent:string;
	private player:Player;


	getDatePublish():Date{
		return this.datePublish;
	}
	setDatePublish(datePublish:Date):void{
		this.datePublish = datePublish;
	}

	getTextContent():string{
		return this.textContent;
	}
	setTextContent(textContent:string):void{
		this.textContent = textContent
	}
	getPlayer():Player{
		return this.player;
	}
	setPlayer(player:Player):void{
		this.player = player;
	}
}