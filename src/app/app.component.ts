import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './layout-partie.html', 
	styleUrls: ['./app.component.css']
})
export class AppComponent  {

	private nbPlayers 		= 0;
	private minPlayers 		= 6;
	private nbLoups			= 0;


	public role = {
		roleName : 'Bouc Emissaire',
		carte : '/assets/cartes/boucEmissaire.jpg',
	};

	player = {
		name 	: 'Chasseur',
		role 	: this.role,
		isReady : false
	};

	public listPlayers = [
		{ 
			name 	: 'Sandy',
			role 	: null,
			isReady	: false
		},
		{ 
			name 	: 'Test',
			role 	: null,
			isReady	: false
		},
		{ 
			name 	: 'Truc',
			role 	: null,
			isReady	: false
		},
		{ 
			name 	: 'Roman',
			role 	: null,
			isReady	: false
		},
		{ 
			name 	: 'Machin',
			role 	: null,
			isReady	: false
		},
		{ 
			name 	: 'Bidule',
			role 	: null,
			isReady	: false
		},
		{ 
			name 	: 'Trucmuche',
			role 	: null,
			isReady	: false
		},
		{ 
			name 	: 'Test2',
			role 	: null,
			isReady	: false
		},
		{ 
			name 	: 'Tamere',
			role 	: null,
			isReady	: false
		}		
	];

	listRoles = [
		{
			roleName 	: 'Loup Garou',
			carte 		: '/assets/cartes/loupGarou.jpg',
			visible 	: true,
			max			: 0.5
		},
		{
			roleName 	: 'Villageois',
			carte 		: '/assets/cartes/villageois.jpg',
			visible 	: true,
			max			: null
		},
		{
			roleName 	: 'Ancien',
			carte 		: '/assets/cartes/ancien.JPG',
			visible 	: true,
			max			: 1
		},
		{
			roleName 	: 'Bouc Emissaire',
			carte 		: '/assets/cartes/boucEmissaire.jpg',
			visible 	: true,
			max			: 1
		},
		{
			roleName 	: 'Chasseur',
			carte 		: '/assets/cartes/chasseur.jpg',
			visible 	: true,
			max			: 1
		},
		{
			roleName 	: 'Cupidon',
			carte 		: '/assets/cartes/cupidon.jpg',
			visible 	: true,
			max			: 1
		},
		{
			roleName 	: 'Idiot',
			carte 		: '/assets/cartes/idiot.jpg',
			visible 	: true,
			max			: 1
		},
		{
			roleName 	: 'Joueur de Flûte',
			carte 		: '/assets/cartes/joueurFlute.jpg',
			visible 	: true,
			max			: 1
		},
		
		{
			roleName 	: 'Maire',
			carte 		: '/assets/cartes/maire.jpg',
			visible 	: true,
			max			: 1
		},
		{
			roleName 	: 'Petit Fille',
			carte 		: '/assets/cartes/petiteFille.jpg',
			visible 	: true,
			max			: 1
		},
		{
			roleName 	: 'Salvateur',
			carte 		: '/assets/cartes/salvateur.jpg',
			visible 	: true,
			max			: 1
		},
		{
			roleName 	: 'Sorcière',
			carte 		: '/assets/cartes/sorciere.jpg',
			visible 	: true,
			max			: 1
		},
		{
			roleName 	: 'Voleur',
			carte 		: '/assets/cartes/voleur.jpg',
			visible 	: true,
			max			: 1
		},
		{
			roleName 	: 'Voyante',
			carte 		: '/assets/cartes/voyante.jpg',
			visible 	: true,
			max			: 1
		},
	];


	addPlayer(playername:string, errorMessage:HTMLElement){

		if(typeof playername != 'undefined' && playername != ''){

			errorMessage.classList.add('hidden');
			var isAvailable = true;

			this.listPlayers.forEach(function(player){
				if(player.name == playername)
					isAvailable = false;
			});

			if(isAvailable == true){

				let newPlayer = {
					name	: playername,
					role 	: this.setRandomRole().roleName,
					isReady : false
				}

				this.listPlayers.push(newPlayer);

				return newPlayer;

			} else {

				errorMessage.classList.remove('hidden');

			} 

		}

	}


	setReady(player){

		player = player.isReady = true;

		this.listPlayers[player] = player;

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

	launchParty(){

	}

	setRandomRole(){

		this.nbPlayers = this.listPlayers.length + 1;

		var newRole = this.listRoles[Math.floor(Math.random()*this.listRoles.length)];

		if(newRole.visible != true){
			newRole =  this.setRandomRole();
		}

		if(newRole.roleName == 'Loup Garou'){
			this.nbLoups += 1;

			var maxLoups = Math.round(this.nbPlayers * this.listRoles[1].max); //Recup du nombre maxi de loups

			if(this.nbLoups > maxLoups){
				newRole =  this.setRandomRole();
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
		}

		return newRole;

	}

}
