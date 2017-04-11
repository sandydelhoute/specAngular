import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent }  from './app.component';
import { Roles }  		from './roles/roles.component';
import { RolesImg }  	from './roles/rolesimg.component';
import { Tchat }  		from './tchat/tchat.component';
import { ListMessages } from './tchat/listmessages.component';


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, Roles, RolesImg, Tchat, ListMessages ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {


}
