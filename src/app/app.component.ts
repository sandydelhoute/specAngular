import { Component, Input, Output } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html', 
	styleUrls: ['./app.component.css']
})
export class AppComponent  {

	public ourself 			= {};

	private nbPlayers 		= 0;
	private minPlayers 		= 1;
	private nbLoups			= 0;
	private nbVillageois	= 0;

	public listPlayers		= [];
	public listRoles		= [];


	setRandomRole(){

		this.nbPlayers = this.listPlayers.length + 1;

		var newRole = this.listRoles[Math.floor(Math.random()*this.listRoles.length)];

		if(newRole.visible != true){ //Si on tombe sur un role non utilisé
			newRole =  this.setRandomRole();
		}

		if(newRole.roleName == 'Loup Garou'){
			this.nbLoups += 1;

			var maxLoups = Math.round(this.nbPlayers * this.listRoles[0].max); //Recup du nombre maxi de loups	

			if(this.nbLoups > maxLoups){
				newRole = this.setRandomRole();
			}

		} else if(newRole.roleName != 'Villageois'){ //Maxi 1 joueur des autres roles

			var isAvailable = true;

			this.listPlayers.forEach(function(player){
				if(player.role == newRole.roleName)
					isAvailable = false;
			});

			if(isAvailable != true) {
				newRole =  this.setRandomRole();
			}
		} else if((this.listPlayers.length >= this.minPlayers) && (this.nbLoups == 0) && (newRole.roleName != 'Loup Garou')){
			newRole = this.setRandomRole(); //Pour avoir au moins 1 loup si + de minPlayers joueurs
		}

		return newRole;

	}

}
