import { Component} from '@angular/core';
import {StockListComponent} from './stock-list.component'

@Component({
	selector: 'my-portfolio',
	directives: [StockListComponent],
	template: `
			<h1> {{title}}</h1>
			<my-stockList></my-stockList>
		`
})

export class PortfolioComponent {
	title = "Portfolio"
}