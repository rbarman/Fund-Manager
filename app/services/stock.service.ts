import { Injectable } from '@angular/core';
import { Stock} from '../components/stock';

// service provides data that multiple components can use
// a component does not necessarily want to create + get data by itself
@Injectable()
export class StockService {
	getStocks() {
		// TODO: should be call to some db
		var stocks : Stock[] = [
			{name: "Apple", symbol: "APPL"},
			{name: "Google", symbol: "GOOG"}
		]
		// returning as a promise
		return Promise.resolve(stocks);
	}
}