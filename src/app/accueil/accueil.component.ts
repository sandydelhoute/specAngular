import { Component,Input,OnInit} from '@angular/core';
import { ChannelService } from '../channel.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as io from "socket.io-client";

@Component({
  	selector: 'accueil',
  	templateUrl: './layout-accueil.html',
	providers:[ChannelService]

})
export class Accueil implements OnInit {

	private error;
	private socket :any = io('http://localhost:3000');

	constructor(private channelService : ChannelService,private router : Router)
	{
	}

	ngOnInit() {
		this.channelService.accesChannel().subscribe(()=>{
			console.log("acces true");
			 this.router.navigate(['/channel']);
		});
		
	}
	addplayer(pseudoPlayer:string){
		this.socket.emit('addPlayer',pseudoPlayer);
		this.router.navigate(['/channel']);

	}

}
