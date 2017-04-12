import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Roles }  		from './roles/roles.component';
import { RolesImg }  	from './roles/rolesimg.component';
import { Tchat }  		from './tchat/tchat.component';
import { ListMessages } from './tchat/listmessages.component';
import { Vote }  		from './vote/vote.component';
import { VoteListPlayers } from './vote/votelistplayers.component';
import { ListPlayers } from './players/listplayers.component';

@NgModule({
  declarations: [
    AppComponent,
    Roles, 
    RolesImg, 
    Tchat, 
    ListMessages,
    Vote,
    VoteListPlayers,
    ListPlayers
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
