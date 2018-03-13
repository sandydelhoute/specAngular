import { Routes,RouterModule } from '@angular/router';
import { Partie } from './partie/partie.component';
import { Accueil } from './accueil/accueil.component';
import { WaitPlayer } from './waitplayer/waitplayer.component';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'game/:channel', component: Partie },
  { path: 'waitplayer/:channel', component: WaitPlayer}
];

export const appRoutingProviders: any[] = [

];
export const routing = RouterModule.forRoot(routes);