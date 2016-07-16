import { Component, Input} from '@angular/core';
import { Stock} from '../models/stock';

//Component to display details of a stock: name, symbol, and price
@Component({
	selector: 'my-stockDetails',
	template: `
		{{stock.name}} ({{stock.symbol}}) - \${{stock.price}} 
	`
})

export class StockDetailsComponent{
	@Input()
	stock: Stock;
}