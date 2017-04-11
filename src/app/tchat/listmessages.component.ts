import { Component, Input } from '@angular/core';

@Component({
  selector: 'listMessages',
  templateUrl: './listMessages.html',

})
export class ListMessages  {
	@Input() message:any;

	


}
