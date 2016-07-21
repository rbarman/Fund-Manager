import { Injectable } from '@angular/core';
import { Stock} from '../models/stock';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// service provides data that multiple components can use
// a component does not necessarily want to create + get data by itself
@Injectable()
export class StockService {

	constructor(private http: Http) { }

	getPricesFromStartOfYear(symbol) {
		// http://ichart.yahoo.com/table.csv?s=MSFT&a=0&b=1&c=2016
		var proxy = "https://crossorigin.me/";
 		var urlStart = "http://ichart.yahoo.com/table.csv?s=";
 		var urlEnd = "&a=0&b=1&c=2016"; // hardcoded jan of 2016, will be dynamic
 		var url = proxy + urlStart + symbol + urlEnd;

		return this.http.get(url).toPromise().then(function(data){
			console.log(data.text());
		}
	}



	// returns a list of the tracked stock symbols.
	// TODO: should be a db call and only return a list of symbols, not Stock objects
	getTrackedStockSymbols() {
		var symbols = [] = ["AAPL", "GOOG","NFLX","DIS","TWTR","GPRO"];
		return Promise.resolve(symbols);
	}

	// returns Stock
 	getStock(symbol) {
 		// Building the GET url.
 		// ex) http://finance.yahoo.com/d/quotes.csv?s=GOOGf=p
 		var proxy = "https://crossorigin.me/";
 		var urlStart = "http://finance.yahoo.com/d/quotes.csv?s=";
 		var urlEnd = "&f=nsp"; // name, symbol, price, 
 		var url = proxy + urlStart + symbol + urlEnd;
		// GET url built, now make http.get call
 		return this.http.get(url).toPromise().then(function(data){
 			var csvLine = data.text(); 
 			// create new stock based on csv 
 			var values = csvLine.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
 			var stock : Stock = {
 				name: values[0].replace(/"/g,""), 
 				symbol: values[1].replace(/"/g,""),
 				price: Number(values[2])
 			}
 			console.log(stock);
 			return stock;
 		});
 	}


	// returns array of Stocks w/ Price info
	// uses yahoo csv finance api => http://www.jarloo.com/yahoo_finance/ for unofficial documentation
	getStocks(symbols) {
		// Building the GET url.
		// ex) http://finance.yahoo.com/d/quotes.csv?s=GOOG,YHOO&f=p
		// depreciated json url : http://finance.yahoo.com/webservice/v1/symbols/AAPL,GOOG/quote?format=json
		var proxy = "https://crossorigin.me/";
		var urlStart = "http://finance.yahoo.com/d/quotes.csv?s=";
		var stockList = "";
		for(var symbol of symbols) {
			stockList = stockList + symbol + ",";
		}
		stockList = stockList.substring(0, stockList.length - 1);
		var urlEnd = "&f=nsp"; // name, symbol, price, 
		var url = proxy + urlStart + stockList + urlEnd;

		// GET url built, now make http.get call
		return this.http.get(url).toPromise().then(function(data){
			var text = data.text(); 
			var csvLines = text.split("\n"); 
			csvLines.pop(); // last element is just blank line
			var stocks : Stock[] = [];
			csvLines.forEach(function(csvLine){
				// for each csv line, get the values and create a Stock.
				// TODO: instead of splitting strings, use a csv parser to reduce regex complexity? 
				// can not simply do csvLine.split(',') because the name could have a comma in it
					// Need to make split str by commas but ignore commas in between quotes
				var values = csvLine.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
				stocks.push({ // nsp
					// want to remove surrounding double quotes on the string values
					name: values[0].replace(/"/g,""), 
					symbol: values[1].replace(/"/g,""),
					price: Number(values[2])
				})
			})
			return stocks;
		});
	}

	getTrackedStocks() {
		var self = this; // this changes in promise callback
		return this.getTrackedStockSymbols().then(function(symbols){
			return self.getStocks(symbols);
		}).catch(function(e){ console.log(e);});
	}
}