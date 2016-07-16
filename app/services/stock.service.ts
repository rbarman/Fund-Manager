import { Injectable } from '@angular/core';
import { Stock} from '../models/stock';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// service provides data that multiple components can use
// a component does not necessarily want to create + get data by itself
@Injectable()
export class StockService {

	constructor(private http: Http) { }

	// returns a list of the tracked stocks.
	// TODO: should be a db call and only return a list of symbols, not Stock objects
	getTrackedStockBySymbol() {
		var symbols = [] = ["AAPL", "GOOG"]
		// var stocks : Stock[] = [
			// {name: "Apple", symbol: "AAPL",price: 0},
			// {name: "Google", symbol: "GOOG", price: 0}
		// ]
		// returning as a promise
		return Promise.resolve(symbols);
	}

	// returns Stock
 	getPriceOfStock(symbol) {
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
 			var values = csvLine.split(',');
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
	getPriceOfStocks(symbols) {
		// Building the GET url.
		// ex) http://finance.yahoo.com/d/quotes.csv?s=GOOG,YHOO&f=p
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
				// TODO: instead of csv, use a csv parser?
				var values = csvLine.split(','); // nsp
				stocks.push({
					// want to remove surrounding double quotes on the string values
					name: values[0].replace(/"/g,""), 
					symbol: values[1].replace(/"/g,""),
					price: Number(values[2])
				})
			})
			return stocks;
		});
	}

	// returns array of Stocks w/ price info
	getPriceOfStocksDepreciated(symbols) {
		// Building the GET url.
		// ex) http://finance.yahoo.com/webservice/v1/symbols/AAPL,GOOG/quote?format=json
		// old csv url : "https://crossorigin.me/https://finance.yahoo.com/d/quotes.csv?s=";
		// yahoo does not support CORs, so need to use a proxy. 
		var proxy = "https://crossorigin.me/";
		var urlStart = "http://finance.yahoo.com/webservice/v1/symbols/";
		var stockList = "";
		for(var symbol of symbols) {
			stockList = stockList + symbol + ",";
		}
		stockList = stockList.substring(0, stockList.length - 1);
		var urlEnd = "/quote?format=json";
		var url = proxy + urlStart + stockList + urlEnd;

		// GET url build, now make http.get call
		return this.http.get(url).toPromise().then(function(data){
			var temp = data.json();
			var resources = temp.list.resources;
			
			// return stocks[] with all relevant info. 
			var stocks : Stock[] = [];
			//TODO: better names? => resource.resource
			for(var i = 0; i < resources.length; i++){
				var resource = resources[i];
				var symbol = resource.resource.fields.symbol;
				var name = resource.resource.fields.name;
				var price = resource.resource.fields.price;
				
				stocks.push({
					name:name,
					symbol:symbol,
					price:price
				});
			}
			return stocks;
		});
	}

	// returns the tracked stocks with price info
	getStocks() {
		var self = this; // this changes in promise callback
		return this.getTrackedStockBySymbol().then(function(symbols){
			return self.getPriceOfStocks(symbols);
		}).catch(function(e){ console.log(e);});
	}
}