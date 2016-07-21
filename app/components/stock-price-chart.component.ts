import { Component, Input,OnInit} from '@angular/core';
import { Stock} from '../models/stock';
import { StockService} from '../services/stock.service';

@Component({
	selector: 'my-stockPriceChart',
	providers: [StockService],
	// directives: [StockDetailsComponent,StockNewsComponent],
	template: `
		chart for {{stock.name}}
	`
})

export class StockPriceChartComponent implements OnInit {
	@Input()
 	stock: Stock;

 	constructor(
  		private stockService: StockService){}
	ngOnInit() {
		// need to set data in some array to pass into chart directive
		this.stockService.getPricesFromStartOfYear(this.stock.symbol);	
	}
}