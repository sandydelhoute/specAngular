import { Component,Input,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ChannelService } from '../service/channel.service';

@Component({
  	selector: 'channel',
  	templateUrl: './layout-channel.html',
	providers:[ChannelService]

})
export class Channel implements OnInit {

	private listChannel;

	constructor(private channelService : ChannelService,private router :Router)
	{
	}
	
	ngOnInit() {

		this.channelService.callListChannel();
		this.channelService.listChannel().subscribe((listChannel)=>{
		this.listChannel=listChannel;
		});
		

	}
}
