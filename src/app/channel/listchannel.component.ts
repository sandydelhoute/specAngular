import { Component, Input,OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { ChannelService } from '../service/channel.service';
import {Channel} from "../Model/Channel";
import { Player } from "../Model/Player";
@Component({
	selector: '[listchannel]',
	templateUrl: './listchannel.html',
	providers:[ChannelService]
})

export class ListChannel implements OnInit {
	@Input() playerNameCreate:boolean;
	@Input() player:Player;
	@Input() channel:Channel;
 	constructor(private channelService : ChannelService,private router : Router)
	{		
	}

	joinChannel(channelName:string){
		this.channelService.JoinChannel(channelName,this.player);
	}

	ngOnInit(){
		this.channelService.accesChannel().subscribe((status:any)=>{

			if(status.access)
			{
				this.router.navigate(['waitplayer',status.name]);
			}
			else
			{
				//this.errorChannel = status.msg;
			}

		});
	}
}
