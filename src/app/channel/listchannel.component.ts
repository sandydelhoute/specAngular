import { Component, Input,OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { ChannelService } from '../channel.service';

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
	}

	joinChannel(channelName:string){
		var userName=sessionStorage.getItem('ourself')
		this.channelService.callJoinChannel(channelName,userName);
	}
	
	ngOnInit(){
		this.channelService.accessJoinChannel().subscribe((status:any)=>{
			console.log(status);
			if(status.access)
			{
				this.router.navigate(['waitPlayer', status.name]);
			}
			else
			{
				console.log("erroracceschannel");
			}

		});
	}
}
