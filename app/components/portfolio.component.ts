import { Component, OnInit} from '@angular/core';
import {StockListComponent} from './stock-list.component'
import {StockPieChartComponent} from './stock-pie-chart.component'

import { StockService} from '../services/stock.service';
import { Stock} from '../models/stock';

@Component({
	selector: 'my-portfolio',
	providers: [StockService],
	directives: [StockListComponent,StockPieChartComponent],
	template: `
			<h1> {{title}}</h1>
			<div *ngIf="stocks">
				<my-stockList [stocks]="stocks"></my-stockList>
				<my-stockPieChart [stocks]="stocks"></my-stockPieChart>
			</div>
		`
})

export class PortfolioComponent implements OnInit {
	stocks : Stock[];
	title = "Portfolio"

	constructor(
		private stockService: StockService){}

	getTrackedStocks() {
		this.stockService.getTrackedStocks().then(stocks => this.stocks = stocks);
  	}

	// lifecycle hook
	ngOnInit() {
	    this.getTrackedStocks();
	}

}