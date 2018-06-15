import { Component,Input,OnInit} from '@angular/core';
import { Router,ActivatedRoute, Params, Data } from '@angular/router';
import { ChannelService } from '../Service/channel.service';
import { PartieService } from '../Service/partie.service';
import { LoginService } from '../Service/login.service';
import {Observable} from 'rxjs/Observable';
import {Channel} from "../Model/Channel";
import {Player} from "../Model/Player";

@Component({
	selector: 'waitPlayer',
	templateUrl: './waitplayer.html',
	providers:[PartieService,ChannelService,LoginService]
})

export class WaitPlayer implements OnInit {

	private channel:Channel = new Channel();;
	private listPlayer :Array<Player> ;
	private player: Player;
	private allReady :boolean;
	
	constructor(
		private channelService : ChannelService,
		private partieService:PartieService,
		private route: ActivatedRoute,
		private router: Router,
		private loginService : LoginService
		){


	}
	
	ngOnInit() {
		if(sessionStorage.getItem('id') === null ){
			this.router.navigate(['/']);
		}
		this.route.params.subscribe(params => {
			this.channel.setName(params['channel']);
			this.channelService.getChannel(this.channel);
		});

		this.channelService.setChannel().subscribe((channel:Channel)=>{
			this.channel=channel;
			this.listPlayer=channel.getListPlayer();
		});
		this.loginService.getPlayer(sessionStorage.getItem('id'),this.channel);

		this.loginService.setPlayer().subscribe((playerInput:Player)=>{
			this.player=playerInput;
		});

		this.channelService.updateChannel().subscribe((channel:any)=>{
			this.listPlayer=channel.listPlayer;
		});

		this.channelService.AllReady().subscribe((channel:any)=>{
			this.allReady = true;
		});

		this.partieService.launchGame().subscribe((channel:any)=>{
			this.router.navigate(['game',channel.name]);
		});

	}

	callLaunchGame(channelName:String){
		this.partieService.callLaunchGame(channelName);
	}



	setReady(){
		this.channelService.setReady(
			this.player,
			this.channel
			);
	}

}
