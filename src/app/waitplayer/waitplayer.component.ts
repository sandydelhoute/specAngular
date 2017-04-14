import { Component,Input,OnInit} from '@angular/core';
import { Router,ActivatedRoute, Params, Data } from '@angular/router';
import { PartieService } from '../partie.service';
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'waitPlayer',
	templateUrl: './waitplayer.html',
	providers:[PartieService]
})

export class WaitPlayer implements OnInit {

	private channel;
	private listPlayers;
	constructor(private partieService : PartieService,private route: ActivatedRoute,
		private router: Router)
	{

	}

	ngOnInit() {
		this.route.params.subscribe(params => {
		this.partieService.getChannel(params['channel']);

		});

		this.partieService.setChannel().subscribe((channel)=>{
			this.channel=channel;
		console.log(channel);
			this.listPlayers=this.channel.listPlayer;
		});
		this.partieService.getPlayer().subscribe((listPlayer)=>{
			this.listPlayers=listPlayer;
		});
	}








	setReady(player, buttonReady:HTMLElement){

		player = player.isReady = true;
		this.listPlayers[player] = player;

		buttonReady.setAttribute('disabled', 'disabled');

		var ready = this.areTheyReady();

		if(ready == true)
			this.launchParty();

	}

	areTheyReady(){
		var allAreReady = true;

		this.listPlayers.forEach(function(player){
			if(player.isReady != true)
				allAreReady = false;
		});

		return allAreReady;

	}

	launchParty(){}



}
