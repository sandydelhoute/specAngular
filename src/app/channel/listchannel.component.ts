import { Component, Input,OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { ChannelService } from '../service/channel.service';

@Component({
	selector: '[listchannel]',
	templateUrl: './listchannel.html',
	providers:[ChannelService]
})

export class ListChannel implements OnInit {
	@Input() channel:any;
	@Input() testButton:any;
	constructor(private channelService : ChannelService,private router : Router)
	{
		this.channelService.accesChannel().subscribe((status:any)=>{
			console.log(status)
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

	joinChannel(channelName:string){
		var userName=sessionStorage.getItem('ourself');
		this.channelService.JoinChannel(channelName,userName);
	}

	ngOnInit(){

	}
}
