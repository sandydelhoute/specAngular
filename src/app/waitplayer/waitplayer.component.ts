import { Component,Input,OnInit} from '@angular/core';
import { Router,ActivatedRoute, Params, Data } from '@angular/router';
import { PartieService } from '../partie.service';

@Component({
  	selector: 'waitPlayer',
  	templateUrl: './waitplayer.html',
	providers:[PartieService]
})

export class WaitPlayer implements OnInit {

private ourself={isMaster:true};
constructor(private partieService : PartieService,private route: ActivatedRoute,
    private router: Router)
	{
	}

  ngOnInit() {

    this.route.snapshot.data['type'];
    this.partieService.getListUser(this.route.snapshot.data['name']
)

  }



  private listPlayers=[{name:'sandy',isReady:false,},{name:'lolo',isReady:false,}];


  	setMaster(){
		if(this.listPlayers.length == 0)
			return true;
		else return false;
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
