import { Component, OnInit} from '@angular/core';
import { Stock} from '../models/stock';
import { StockService} from '../services/stock.service';
import {StockDetailsComponent} from './stock-details.component';
import { Router } from '@angular/router';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

@Component({
	selector: "my-stockList",
	providers: [StockService],
	directives: [StockDetailsComponent,MD_CARD_DIRECTIVES],
	template: `
		<md-card>	
			stock list
			<li *ngFor = "let stock of stocks" (click)="goToStock(stock)">
				<my-stockDetails [stock]="stock"></my-stockDetails>
			</li>
		</md-card>
	`
})
export class StockListComponent {
	stocks : Stock[];

	constructor(
		private stockService: StockService,
		private router: Router){}
	
	getTrackedStocks() {
		this.stockService.getTrackedStocks().then(stocks => this.stocks = stocks);
  	}

	// lifecycle hook
	ngOnInit() {
	    this.getTrackedStocks();
	}

	// go to stock route based on clicked stock
	goToStock(stock: Stock) {
  		let link = ['/stock', stock.symbol];
  		this.router.navigate(link);
	}

}