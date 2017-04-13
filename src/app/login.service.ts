import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class LoginService {
	private socket:any=io('http://localhost:3000');
	constructor() { }

	errorPlayer(){
		let observerErrorPlayer = new Observable(observer => {
			this.socket.on('errorPlayer',(msgError)=>{
				observer.next(msgError);
			});

		});
		return observerErrorPlayer;
	}

}
