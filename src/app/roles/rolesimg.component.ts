import { Component, Input } from '@angular/core';

@Component({
  selector: 'rolesImg',
  templateUrl: './rolesImg.html',
  styleUrls:['./rolesImg.css']
})
export class RolesImg  {
	@Input() player:any;


}
