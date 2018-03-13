import {Message} from "../Model/Message";
import {Player} from "../Model/Player";

export class Channel{

	private id:number;
	private name:string;
	private minPlayer:number;
	private maxPlayer:number;
	private listmessageLoup : Array<Message>;
	private listmessageAll : Array<Message>;
	private listPlayer :Array<Player>;

	getId():number{
		return this.id;
	}
	setId(id:number):void{
		this.id = id;
	}
	getName():string{
		return this.name;
	}
	setName(name:string):void{
		this.name=name;
	}
	getMinPlayer():number{
		return this.minPlayer;
	}
	setMinPlayer(minPlayer:number):void{
		this.minPlayer = minPlayer;
	}
	getMaxPlayer():number{
		return this.maxPlayer;
	}
	setMaxPlayer(maxPlayer:number):void{
		this.maxPlayer = maxPlayer;
	}
	getListMessageLoup():Array<Message>{
		return this.listmessageLoup;
	}
	setListMessageLoup(listmessageLoup:Array<Message>):void{
		this.listmessageLoup=listmessageLoup;
	}
	addListMessageLoup(message:Message):void{
		this.listmessageLoup.push(message);
	}

	getListMessageAll():Array<Message>{
		return this.listmessageAll;
	}
	setListMessageAll(listmessageAll:Array<Message>):void{
		this.listmessageAll=listmessageAll;
	}
	addListMessageAll(message:Message):void{
		this.listmessageAll.push(message);
	}
	getListPlayer():Array<Player>{
		return this.listPlayer;
	}
	setListPlayer(listPlayer:Array<Player>){
		this.listPlayer=listPlayer;
	}
	static fromJson(json:Object):Channel{
		let channel = new Channel();
		if(typeof json['id'] !== "undefined" ){
			channel.setId(json['id']);
		}
		if(typeof json['name'] !== "undefined"){
			channel.setName(json['name']);
		}
		if(typeof json['minPlayer'] !== "undefined"){
			channel.setMinPlayer(json['minPlayer']);
		}
		if(typeof json['maxPlayer'] !== "undefined"){
			channel.setMaxPlayer(json['maxPlayer']);
		}
		if(typeof json['listPlayer'] !== "undefined"){
			channel.setListPlayer(Player.fromJsonList(json['listPlayer']));
		}
		if(typeof json['listMessageAll'] !== "undefined"){
			channel.setListMessageAll(json['listMessageAll']);
		}
		if(typeof json['listMessageLoup'] !== "undefined"){
			channel.setListMessageLoup(json['listMessageLoup']);
		}
		return channel;
	}
	static fromJsonList(json : Array<Object> ):Array<Channel>{
		let listChannel = new Array<Channel>();
		json.map((channel)=>{
			listChannel.push(this.fromJson(channel));
		});

		return listChannel;
	}
}