import { Component, Input, OnInit} from '@angular/core';
import { Stock} from '../models/stock';
import { StockService} from '../services/stock.service';
import {StockDetailsComponent} from './stock-details.component';
import { Router } from '@angular/router';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';

@Component({
	selector: "my-stockList",
	providers: [StockService],
	directives: [StockDetailsComponent,MD_CARD_DIRECTIVES,MD_LIST_DIRECTIVES,MD_BUTTON_DIRECTIVES],
	template: `
		<md-card>	
			Stock List
			<md-list>
				<md-list-item *ngFor = "let stock of stocks">
					<button md-button color="warn" (click)="removeStock(stock)">X</button>
				    <button md-raised-button (click)="goToStock(stock)">
						<my-stockDetails [stock]="stock"></my-stockDetails>
					</button>
				</md-list-item>
			</md-list>
		</md-card>
	`
})
export class StockListComponent {
	@Input() // gets stocks from PortfolioComponent
	stocks : Stock[];

	constructor(
		private router: Router,
		private stockService: StockService){}

	removeStock(stock:Stock) {
		this.stockService.removeStock(stock);
	}

	// go to stock route based on clicked stock
	goToStock(stock: Stock) {
  		let link = ['/stock', stock.symbol];
  		this.router.navigate(link);
	}
}