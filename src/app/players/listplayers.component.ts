import { Component, Input } from '@angular/core';

@Component({
  selector: '[listPlayers]',
  templateUrl: './listPlayers.html',

})
export class ListPlayers  {
	@Input() player:any;
	


}
