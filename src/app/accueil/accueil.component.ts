import { Component,Input,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { LoginService } from '../login.service';
import { ChannelService } from '../channel.service';
import * as io from "socket.io-client";

@Component({
  	selector: 'accueil',
  	templateUrl: './layout-accueil.html',
	providers:[ChannelService,LoginService]

})
export class Accueil implements OnInit {

	private error;
	private listChannel;
	public ourself = {name:null};

	constructor(private channelService : ChannelService,private loginService : LoginService,private router : Router)
	{
	}

	ngOnInit() {
		this.channelService.accesChannel().subscribe((user:any)=>{
			this.ourself.name=user.name;
		});

		this.channelService.callListChannel();
		this.channelService.listChannel().subscribe((listChannel)=>{
			this.listChannel=listChannel;
		});
		this.channelService.noAccessChannel().subscribe((boolAccess:boolean)=>{
			this.ourself = {name:null};
		});
		this.channelService.statusCreateChannel().subscribe((status:any)=>{
			if(status.create)
			{

				console.log("create channel ok ");
				this.router.navigate(['waitplayer',status.name]);
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
				this.router.navigate(['/waitPlayer', statut.name]);
			}
			else
			{
				console.log("erroracceschannel");
			}

		});

	}

	buttonState(inverted = false){
		if(this.ourself.hasOwnProperty('name') && this.ourself.name != null){
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
			
			this.ourself.name = playername;
			this.loginService.addPlayer(playername);

			this.buttonState();

		} else {

			errorMessage.classList.remove('hidden');

		}

	}

	createChannel(nameChannel : string, errorMessage:HTMLElement ){
		if(nameChannel != ''){
			errorMessage.classList.add('hidden');
			this.channelService.createChannel(nameChannel);
		} else {
			errorMessage.classList.remove('hidden');
		}
	}

	joinChannel(channelName:string){
		this.channelService.callJoinChannel(channelName);
	}
	

}
