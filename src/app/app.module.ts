import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent } from './app.component';

import { Accueil } from './accueil/accueil.component';
import { Partie } from './partie/partie.component';
import { WaitPlayer } from './waitplayer/waitplayer.component';
import { Channel } from './channel/channel.component';
import { ListChannel } from './channel/listchannel.component';

import { Roles }  		from './roles/roles.component';
import { RolesImg }  	from './roles/rolesimg.component';
import { Tchat }  		from './tchat/tchat.component';
import { ListMessages } from './tchat/listmessages.component';
import { Vote }  		from './vote/vote.component';
import { VoteListPlayers } from './vote/votelistplayers.component';


@NgModule({
  declarations: [
    WaitPlayer,
    AppComponent,
    Roles, 
    RolesImg, 
    Tchat, 
    ListMessages,
    Vote,
    VoteListPlayers,
    Partie,
    Channel,
    ListChannel,
    Accueil
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
