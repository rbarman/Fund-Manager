import { Component} from '@angular/core';
// import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
// import { ROUTER_DIRECTIVES } from '@angular/router';
// import { SampleComponent } from './sample.component';
// import { SampleService } from '../services/sample.service';

//AppComponent will be the main router component
@Component({
	selector: 'my-app',
	template: `
		<h1> {{title}} </h1>

		<!-- Example of using router-outlet with a link-->
     	<!-- <a [routerLink]="['Dashboard']">Dashboard</a> -->
     	<router-outlet></router-outlet>
	`
})

export class AppComponent{
	title = 'Title'
}