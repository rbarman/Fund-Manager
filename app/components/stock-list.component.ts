import { Component, OnInit} from '@angular/core';
import { Stock} from './stock';
import { StockService} from '../services/stock.service';

@Component({
	selector: "my-stockList",
	providers: [StockService],
	template: `
		stock list
		<li *ngFor = "let stock of stocks">
			{{stock.name}}
		</li>
	`
})
export class StockListComponent {
	stocks : Stock[];

	constructor(private stockService: StockService) { }

	getStocks() {
		// for a sync call...
    	// this.stocks = this.stockService.getStocks();
		this.stockService.getStocks().then(stocks => this.stocks = stocks);
  	}

	// lifecycle hook
	ngOnInit() {
	    this.getStocks();
	}
}