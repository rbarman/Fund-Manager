import { Component, Input,OnInit} from '@angular/core';
import { Stock} from '../models/stock';
import { StockService} from '../services/stock.service';

@Component({
	selector: 'my-stockPriceChart',
	providers: [StockService],
	// directives: [StockDetailsComponent,StockNewsComponent],
	template: `
		chart for {{stock.name}}
		<li *ngFor = "let data of chartData">
			{{data}}
		</li>
	`
})

export class StockPriceChartComponent implements OnInit {
	@Input()
 	stock: Stock;
	chartData:number[];

 	constructor(
  		private stockService: StockService){}
	ngOnInit() {
		// this.stockService.getPricesFromStartOfYear(this.stock.symbol);	
		// need to set data in some array to pass into chart directive
		this.stockService.getPricesFromStartOfYear(this.stock.symbol).then(prices => this.chartData = prices);
	}
}