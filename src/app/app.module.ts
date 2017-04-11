import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { Roles }  from './roles/roles.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, Roles ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
