import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

//AppComponent will be the main router component
@Component({
	selector: 'my-app',
	directives: [ROUTER_DIRECTIVES],
	template: `<router-outlet></router-outlet>`,

})

export class AppComponent{}