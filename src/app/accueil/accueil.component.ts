import { Component,Input,OnInit} from '@angular/core';
import { ChannelService } from '../channel.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as io from "socket.io-client";

@Component({
  	selector: 'accueil',
  	templateUrl: './layout-accueil.html',
	providers:[ChannelService]

})
export class Accueil implements OnInit {

	private error;
	private socket :any = io('http://localhost:3000');
	private listChannel;
	public ourself = { name : '' };

	constructor(private channelService : ChannelService,private router : Router)
	{
	}

	ngOnInit() {
		this.channelService.accesChannel().subscribe(()=>{
			console.log("acces true");
			 this.router.navigate(['/channel']);
		});

		this.channelService.callListChannel();
		this.channelService.listChannel().subscribe((listChannel)=>{
			this.listChannel=listChannel;
		});
		this.channelService.statusCreateChannel().subscribe((status)=>{
			if(status)
			{
				console.log("create channel ok ");
				this.router.navigate(['waitplayer']);
			}
			else
			{
				console.log("create channel error");
			}

		});
		
		this.channelService.accessJoinChannel().subscribe((accessJoinChannel)=>{
			console.log(accessJoinChannel);
			if(accessJoinChannel)
			{
				this.router.navigate(['/waitPlayer']);
			}
			else
			{
				console.log("erroracceschannel");
			}

		});

	}

	buttonState(inverted = false){
		if(this.ourself.hasOwnProperty('name') && this.ourself.name != ''){
			if(typeof inverted != 'undefined' && inverted == true)
				return false;
			else
				return true;
		}
		else {
			if(typeof inverted != 'undefined' && inverted == true)
				return true;
			else
				return false;
		}
	}

	addPlayer(playername:string, errorMessage:HTMLElement){

		if(typeof playername != 'undefined' && playername != ''){

			errorMessage.classList.add('hidden');
			
			this.buttonState();
			this.socket.emit('addPlayer',playername);

			this.ourself.name = playername;

		} else {

			errorMessage.classList.remove('hidden');

		}

	}

	createChannel(nameChannel : string ){
		this.channelService.createChannel(nameChannel);
	}

	joinChannel(channelName:string){
		this.channelService.callJoinChannel(channelName);
	}
	

}
