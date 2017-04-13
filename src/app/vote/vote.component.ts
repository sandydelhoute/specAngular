import { Component, Input } from '@angular/core';

@Component({
  selector: 'vote',
  templateUrl: './vote.html',

})
export class Vote  {
	@Input() player:any;
	@Input() listPlayers:any;
public vote={};

validevote(playerChoosen : HTMLInputElement){

console.log(this.vote)

}
	


}
