import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './layout-partie.html'
})
export class AppComponent  {

  role = {
    roleName : 'Ancien',
    carte : 'ancien.JPG',
  };

  player = {
    name : 'Ancien',
    role : 'ancien.JPG',
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
  ];

  roles = [
    {
      roleName : 'Ancien',
      carte : 'ancien.JPG',
      visible : true,
    },
    {
      roleName : 'Bouc Emissaire',
      carte : 'boucEmissaire.jpg',
      visible : true,
    },
    {
      roleName : 'Chasseur',
      carte : 'chasseur.jpg',
      visible : true,
    },
    {
      roleName : 'Cupidon',
      carte : 'cupidon.jpg',
      visible : true,
    },
    {
      roleName : 'Idiot',
      carte : 'idiot.jpg',
      visible : true,
    },
    {
      roleName : 'Joueur de Flûte',
      carte : 'joueurFlute.jpg',
      visible : true,
    },
    {
      roleName : 'Loup Garou',
      carte : 'loupGarou.jpg',
      visible : true,
    },
    {
      roleName : 'Maire',
      carte : 'maire.jpg',
      visible : true,
    },
    {
      roleName : 'Petit Fille',
      carte : 'petiteFille.jpg',
      visible : true,
    },
    {
      roleName : 'Salvateur',
      carte : 'salvateur.jpg',
      visible : true,
    },
    {
      roleName : 'Sorcière',
      carte : 'sorciere.jpg',
      visible : true,
    },
    {
      roleName : 'Villageois',
      carte : 'villageois.jpg',
      visible : true,
    },
    {
      roleName : 'Voleur',
      carte : 'voleur.jpg',
      visible : true,
    },
    {
      roleName : 'Voyante',
      carte : 'voyante.jpg',
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
