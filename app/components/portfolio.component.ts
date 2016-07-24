import { Component, OnInit} from '@angular/core';
import {StockListComponent} from './stock-list.component'
import {StockPieChartComponent} from './stock-pie-chart.component'
import { StockService} from '../services/stock.service';
import { Stock} from '../models/stock';
import {StockSymbolFormComponent} from './stock-symbol-form.component';

@Component({
	selector: 'my-portfolio',
	providers: [StockService],
	directives: [StockListComponent,StockPieChartComponent,StockSymbolFormComponent],
	template: `
			<h1> {{title}}</h1>
			<div *ngIf="stocks">
				<div *ngIf="stocks.length > 0">
					<my-stockList [stocks]="stocks"></my-stockList>
					<my-stockPieChart [stocks]="stocks"></my-stockPieChart>
				</div>
				<div *ngIf="stocks.length == 0">
					You have zero stocks in your portfolio. Add one!
					<my-symbolForm> </my-symbolForm>
				</div>
			</div>
		`
})

export class PortfolioComponent implements OnInit {
	stocks : Stock[];
	title = "Portfolio"

	constructor(
		private stockService: StockService){}

	getTrackedStocks() {
		// TODO: get it to work with a 'master func' like getTrackedStocks() in StockService
		// this.stockService.getTrackedStocks().then(stocks => this.stocks = stocks);
		var self = this;
		self.stockService.getTrackedStockSymbols().subscribe(function(symbols){
			if(symbols.length == 0){
				self.stocks = [];
			}
			else {
				self.stockService.getStocks(symbols).then(stocks => self.stocks = stocks);
			}
		})
  	}

	// lifecycle hook
	ngOnInit() {
	    this.getTrackedStocks();
	}

}