import { Component, OnInit} from '@angular/core';
import { Stock} from './stock';

@Component({
	selector: "my-stockList",
	template: `
		stock list
		<li *ngFor = "let stock of stocks">
			{{stock.name}}
		</li>
	`
})
export class StockListComponent {
	stocks : Stock[];

	// lifecycle hook
	ngOnInit() {
		// TODO: create getStock service
		this.stocks = [];
		this.stocks.push({name: "Apple", symbol: "APPL"})
		this.stocks.push({name: "Google", symbol: "GOOG"})
	}
}