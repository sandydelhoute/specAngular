import { Component, Input } from '@angular/core';

@Component({
  selector: 'voteListPlayers',
  templateUrl: './voteListPlayers.html',

})
export class VoteListPlayers  {
	@Input() player:any;
	@Input() vote:any;


selectedvote(playername:string){
this.vote.name=playername
};


}
