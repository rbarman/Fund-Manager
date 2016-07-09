import { Component} from '@angular/core';

@Component({
	selector: 'my-portfolio',
	template: `
			<h1> {{title}}</h1>
		`
})

export class PortfolioComponent {
	title = "Portfolio"
}