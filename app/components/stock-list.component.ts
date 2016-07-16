import { Component, OnInit} from '@angular/core';
import { Stock} from '../models/stock';
import { StockService} from '../services/stock.service';
import {StockDetailsComponent} from './stock-details.component';

@Component({
	selector: "my-stockList",
	providers: [StockService],
	directives: [StockDetailsComponent],
	template: `
		stock list
		<li *ngFor = "let stock of stocks">
			<my-stockDetails [stock]="stock"></my-stockDetails>
		</li>
	`
})
export class StockListComponent {
	stocks : Stock[];

	constructor(private stockService: StockService) { }
	
	getStocks() {
		// for temp
		// this.stockService.getStocks();
		this.stockService.getStocks().then(stocks => this.stocks = stocks);
  	}

	// lifecycle hook
	ngOnInit() {
	    this.getStocks();
	}
}