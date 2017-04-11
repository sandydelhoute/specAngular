import { Component, Input } from '@angular/core';

@Component({
  selector: 'listMessages',
  templateUrl: './listMessages.html',
  styleUrls:['./listMessages.css']

})
export class ListMessages  {
	@Input() message:any;

	


}
