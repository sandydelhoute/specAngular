import { Component,Input,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { LoginService } from '../service/login.service';
import { ChannelService } from '../service/channel.service';
import * as io from "socket.io-client";
import {Channel} from "../Model/Channel";
import { Player } from "../Model/Player";
@Component({
  	selector: 'accueil',
  	templateUrl: './layout-accueil.html',
	providers:[ChannelService,LoginService]
})
export class Accueil implements OnInit {

	private listChannel:Array<Channel> = new Array<Channel>();
	private errorChannel:string;
	private player:Player = new Player();
	private userCreated = false;
	constructor(
		private channelService : ChannelService,
		private loginService : LoginService,
		private router : Router){

	}

	ngOnInit() {
	
		this.channelService.callListChannel();
		this.channelService.listChannel().subscribe((listChannel:Array<Channel>)=>{
				this.listChannel=listChannel;
			
		});
		this.loginService.setPlayer().subscribe((playerInput:Player)=>{
			this.player=playerInput;
			sessionStorage.setItem('id',this.player.getId());
			this.userCreated = true ;
		});
		this.channelService.statusCreateChannel().subscribe((status:any)=>{
			if(status.create)
			{
				this.router.navigate(['waitplayer',status.channel.name]);
			}
			else
			{
				this.errorChannel = status.msg;
			}

		});
		

	}

	

	createPlayer(playername:string, errorMessage:HTMLElement){
		if(typeof playername != 'undefined' && playername != ''){
			errorMessage.classList.add('hidden');
			let player:Player = new Player();
			player.setName(playername);
			this.loginService.createPlayer(player);

		} else {

			errorMessage.classList.remove('hidden');

		}

	}

	createChannel(nameChannel : string, errorMessage:HTMLElement ){
		if(nameChannel != ''){
			errorMessage.classList.add('hidden');
			let channel : Channel = new Channel();
			channel.setName(nameChannel);
			this.channelService.createChannel(channel,this.player);
		} else {
			errorMessage.classList.remove('hidden');
			setTimeout(()=>{
					errorMessage.classList.add('hidden');
			},3000)
		}
	}


	

}
