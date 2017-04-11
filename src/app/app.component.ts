import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.html',
})

export class AppComponent  {
  name = 'Angular';
  role = {
    roleName : 'Ancien',
    carte : 'ancien.JPG',
  };

  roles = [
    {
      roleName : 'Ancien',
      carte : 'ancien.JPG',
      visible : true,
      prof : true
    },
    {
      roleName : 'Bouc Emissaire',
      carte : 'boucEmissaire.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Chasseur',
      carte : 'chasseur.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Cupidon',
      carte : 'cupidon.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Idiot',
      carte : 'idiot.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Joueur de Flûte',
      carte : 'joueurFlute.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Loup Garou',
      carte : 'loupGarou.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Maire',
      carte : 'maire.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Petit Fille',
      carte : 'petiteFille.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Salvateur',
      carte : 'salvateur.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Sorcière',
      carte : 'sorciere.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Villageois',
      carte : 'villageois.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Voleur',
      carte : 'voleur.jpg',
      visible : true,
      prof : true
    },
    {
      roleName : 'Voyante',
      carte : 'voyante.jpg',
      visible : true,
      prof : true
    },
  ];

  clickH1(){
    this.role.roleName = 'J2';
  }

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
