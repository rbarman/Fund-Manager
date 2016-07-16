import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock} from '../models/stock';
import { StockService} from '../services/stock.service';
import {StockDetailsComponent} from './stock-details.component';

// Stock component for when the user goes to the Stock route.
@Component({
	selector: 'my-stock',
	providers: [StockService],
	directives: [StockDetailsComponent],
	template: `
			<div *ngIf="stock"> <!-- stock won't be defined until the promise is over -->
				<my-stockDetails [stock]="stock"></my-stockDetails>
			</div>
		`
})

export class StockComponent implements OnInit, OnDestroy {
 	stock: Stock;
 	sub : any;

 	constructor(
  		private stockService: StockService,
   		private route: ActivatedRoute) {}
 
 	ngOnInit() {
 		// http://localhost:3000/stock/AAPL => set stock based on symbol in route params
 	    this.sub = this.route.params.subscribe(params => {
	    	var symbol = params['symbol'];
      		this.stockService.getPriceOfStock(symbol).then(stock => this.stock = stock);
 	    });
 	}
 
 	ngOnDestroy() {
 		this.sub.unsubscribe();
 	}

}