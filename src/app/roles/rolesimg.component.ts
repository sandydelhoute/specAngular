import { Component, Input } from '@angular/core';
import { Player } from "../Model/Player";
import { Role } from "../Model/Role";

@Component({
  selector: 'rolesImg',
  templateUrl: './rolesImg.html',
})
export class RolesImg  {
	@Input() player:Player;

		constructor(){
		}
	ngoninit(){
	}

}
