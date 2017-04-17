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
	private errorChannel;
	public ourself = {name:null};

	constructor(private channelService : ChannelService,private loginService : LoginService,private router : Router)
	{
	}

	ngOnInit() {
		// this.channelService.accesChannel().subscribe((user:any)=>{
		// 	this.ourself.name=user.name;

		// });

		this.channelService.callListChannel();
		this.channelService.listChannel().subscribe((listChannel)=>{
			this.listChannel=listChannel;
		});
		this.channelService.statusCreateChannel().subscribe((status:any)=>{
			if(status.create)
			{

 
				this.router.navigate(['waitplayer',status.name]);
			}
			else
			{
				this.errorChannel = status.msg;
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
			sessionStorage.setItem('ourself', playername);

			this.loginService.addPlayer(playername);

			this.buttonState();

		} else {

			errorMessage.classList.remove('hidden');

		}

	}

	createChannel(nameChannel : string, errorMessage:HTMLElement ){
		if(nameChannel != ''){
			errorMessage.classList.add('hidden');
			var userName=sessionStorage.getItem('ourself');
			this.channelService.createChannel(nameChannel,userName);
		} else {
			errorMessage.classList.remove('hidden');
		}
	}


	

}
