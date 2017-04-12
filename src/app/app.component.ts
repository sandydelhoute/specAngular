import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './layout-partie.html', 
	styleUrls: ['./app.component.css']
})
export class AppComponent  {

	role = {
		roleName : 'Bouc Emissaire',
		carte : '/assets/cartes/boucEmissaire.jpg',
	};

	player = {
		name : 'Chasseur',
		role : this.role,
	};

	listPlayers = [
		{ 
			name : 'Sandy',
			role : 'loup'
		},
		{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
			{ 
			name : 'Roman',
			role : 'ancien'
		},
		
	];

	roles = [
		{
			roleName : 'Ancien',
			carte : '/assets/cartes/ancien.JPG',
			visible : true,
		},
		{
			roleName : 'Bouc Emissaire',
			carte : '/assets/cartes/boucEmissaire.jpg',
			visible : true,
		},
		{
			roleName : 'Chasseur',
			carte : '/assets/cartes/chasseur.jpg',
			visible : true,
		},
		{
			roleName : 'Cupidon',
			carte : '/assets/cartes/cupidon.jpg',
			visible : true,
		},
		{
			roleName : 'Idiot',
			carte : '/assets/cartes/idiot.jpg',
			visible : true,
		},
		{
			roleName : 'Joueur de Flûte',
			carte : '/assets/cartes/joueurFlute.jpg',
			visible : true,
		},
		{
			roleName : 'Loup Garou',
			carte : '/assets/cartes/loupGarou.jpg',
			visible : true,
		},
		{
			roleName : 'Maire',
			carte : '/assets/cartes/maire.jpg',
			visible : true,
		},
		{
			roleName : 'Petit Fille',
			carte : '/assets/cartes/petiteFille.jpg',
			visible : true,
		},
		{
			roleName : 'Salvateur',
			carte : '/assets/cartes/salvateur.jpg',
			visible : true,
		},
		{
			roleName : 'Sorcière',
			carte : '/assets/cartes/sorciere.jpg',
			visible : true,
		},
		{
			roleName : 'Villageois',
			carte : '/assets/cartes/villageois.jpg',
			visible : true,
		},
		{
			roleName : 'Voleur',
			carte : '/assets/cartes/voleur.jpg',
			visible : true,
		},
		{
			roleName : 'Voyante',
			carte : '/assets/cartes/voyante.jpg',
			visible : true,
		},
	];

	enterEditName( element: HTMLInputElement ){
		element.focus();
	}

	editName( updatedText: string ){
		this.role.roleName = updatedText;
	}

	cancelEdit( element: HTMLInputElement ){
		element.value = this.role.roleName;
	}

}
