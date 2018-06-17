import { Component, Input } from '@angular/core';
import { ChannelService } from '../Service/channel.service';
import { Router,ActivatedRoute, Params, Data } from '@angular/router';

@Component({
  selector: 'partie',
  templateUrl: './layout-partie.html',
  providers:[ChannelService]
})
export class Partie  {
	private player:any;
	private channel:any;
	private listPlayer:any;
	private
	constructor(private channelService:ChannelService,private route: ActivatedRoute,
		private router: Router){
		this.player={'name':sessionStorage.getItem('ourself'),'role':{'roleName':null,'carte':null}};
	}
	ngOnInit() {
		
		let player=this.player;
		this.route.params.subscribe(params => {
				this.channelService.getChannel(params['channel']);
		});

		this.channelService.updateChannel().subscribe((channel:any)=>{
			this.channel=channel;
			this.listPlayer=channel.listPlayer;
			channel.listPlayer.map(function(user){
				if(user.name == player.name)
				{
					player=user;
				}
			});
			this.player = player;
		});

	}
}
