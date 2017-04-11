import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './layout-accueil.html',
})
export class AppComponent  {

	role = {
		img 	: './cartes/ancien.JPG',
		name 	: 'Ancien' 
	};

	player = {
		name: 'Toto',
		role: 'loup'
	};

}
