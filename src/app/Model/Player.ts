import {Role} from "../Model/Role";

export class Player{
	private id:string;
	private name:string;
	private role:Role;
	private isMaster:boolean;
	private isReady:boolean;
	constructor(){
	}

	getId(){
		return this.id;
	}
	setId(id:string):void{
		this.id=id;
	}
	getName(){
		return this.name;
	}
	setName(name:string):void{
		this.name=name;
	}
	getRole(){
		return this.role;
	}
	setRole(role:Role):void{
		this.role = role;
	}
	getIsMaster():boolean{
		return this.isMaster;
	}
	setIsMaster(isMaster:boolean):void{
		this.isMaster=isMaster;
	}
	getIsReady():boolean{
		return this.isReady;
	}
	setIsReady(isReady:boolean):void{
		this.isReady=isReady;
	}
    static fromJson(json: Object): Player {
    	if(json === null)
    	{
    		return null;
    	}
    	let player = new Player();
    	if(typeof json['id'] !== "undefined"){
    		player.setId(json['id']);
    	}
    	if(typeof json['name'] !== "undefined"){
    		player.setName(json['name']);
    	}

    	if(typeof json['role'] !== "undefined"){
    		player.setRole(Role.fromJson(json['role']));
    	}

    	if(typeof json['isReady'] !== "undefined"){
    		player.setIsReady(json['isReady']);
    	}

    	if(typeof json['isMaster'] !== "undefined"){
    		player.setIsMaster(json['isMaster']);
    	}

    	return player;
    }
    static fromJsonList(json : Array<Object>):Array<Player>{
    	let listPlayer = new Array<Player>();
    	json.map((player)=>{
    		listPlayer.push(this.fromJson(player));
    	});
    	return listPlayer;

    }
}