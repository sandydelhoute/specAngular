import { Component,Input,OnInit} from '@angular/core';
import { Router,ActivatedRoute, Params, Data } from '@angular/router';
import { ChannelService } from '../service/channel.service';
import { PartieService } from '../service/partie.service';
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'waitPlayer',
	templateUrl: './waitplayer.html',
	providers:[PartieService,ChannelService]
})

export class WaitPlayer implements OnInit {

	private channel:any;
	private listPlayer :any;
	private player: any ;
	private allReady :boolean;
	
	constructor(private channelService : ChannelService,private partieService:PartieService,private route: ActivatedRoute,
		private router: Router)
	{
		this.player={'name':null,'role':{'roleName':null,'carte':null}};
	}
	
	ngOnInit() {
		var userName=sessionStorage.getItem('ourself');
		var player;
		this.route.params.subscribe(params => {
			this.channelService.getChannel(params['channel']);
		});

		this.channelService.setChannel().subscribe((channel:any)=>{
			this.channel=channel;
			this.listPlayer=channel.listPlayer;
			channel.listPlayer.map(function(user){
				if(user.isMaster)
				{
					console.log("je suis master");
					user.master = true;
				}
				else
				{					
					console.log("je suis pas master");
					user.master = false;
				}
				if(user.name == userName)
				{
					player=user;
				}
			});
			this.player=player;
		});

	this.channelService.updateChannel().subscribe((channel:any)=>{
			    console.log(channel)

			this.listPlayer=channel.listPlayer;
		});
	}


	callLaunchGame(){
		console.log("je suis dnas le click callLaunchGame");
		this.partieService.callLaunchGame(this.route.params.subscribe(params => {
			return (params['channel']);
		}));
	}



	setReady(){
		let player=this.player;
		let channel=this.channel;

		this.partieService.setReady(
			player,
			channel
			);
	}

	areTheyReady(){
		var allAreReady = true;

		this.listPlayer.forEach(function(player){
			if(player.isReady != true)
				allAreReady = false;
		});

		return allAreReady;

	}

}
