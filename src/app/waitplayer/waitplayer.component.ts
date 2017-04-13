import { Component,Input} from '@angular/core';
import { Router } from '@angular/router';
import { PartieService } from '../partie.service';

@Component({
  	selector: 'waitPlayer',
  	templateUrl: './waitplayer.html',
	providers:[PartieService]
})

export class WaitPlayer {

constructor(private partieService : PartieService, private router :Router)
	{
	}
		
}
