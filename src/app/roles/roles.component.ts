import { Component, Input } from '@angular/core';

@Component({
  selector : 'list',
  templateUrl : './roles.html',
})
export class Roles {
  @Input() role:any;
}
