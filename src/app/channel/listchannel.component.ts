import { Component, Input,OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { ChannelService } from '../channel.service';

@Component({
	selector: 'listchannel',
	templateUrl: './listchannel.html',
	providers:[ChannelService]


})
export class ListChannel implements OnInit {
	@Input() channel:any;
	constructor(private channelService : ChannelService,private router : Router)
	{
	}

	joinChannel(channelName:string){
		this.channelService.callJoinChannel(channelName);
	}
	ngOnInit(){
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
}
