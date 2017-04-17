import { Routes,RouterModule } from '@angular/router';
import { Partie } from './partie/partie.component';
import { Accueil } from './accueil/accueil.component';
import { Channel } from './channel/channel.component';
import { WaitPlayer } from './waitplayer/waitplayer.component';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'channel', component: Channel },
  { path: 'partie', component: Partie },
  { path: 'waitplayer/:channel', component: WaitPlayer, }
];

export const appRoutingProviders: any[] = [

];
export const routing = RouterModule.forRoot(routes);