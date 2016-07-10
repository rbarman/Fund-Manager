import { Component, OnInit} from '@angular/core';
import { Stock} from './stock';
import { StockService} from '../services/stock.service';

@Component({
	selector: "my-stockList",
	providers: [StockService],
	template: `
		stock list
		<li *ngFor = "let stock of stocks">
			{{stock.name}} ({{stock.symbol}}) - $ {{stock.price}} 
		</li>
	`
})
export class StockListComponent {
	stocks : Stock[];

	constructor(private stockService: StockService) { }
	
	getStocks() {
		this.stockService.getStocks().then(stocks => this.stocks = stocks);
  	}

	// lifecycle hook
	ngOnInit() {
	    this.getStocks();
	}
}