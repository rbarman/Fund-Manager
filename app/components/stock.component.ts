import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock} from '../models/stock';
import { NytArticle} from '../models/nyt-article';
import { StockService} from '../services/stock.service';
import { ArticleService} from '../services/article.service';
import {StockDetailsComponent} from './stock-details.component';

// Stock component for when the user goes to the Stock route.
@Component({
	selector: 'my-stock',
	providers: [StockService, ArticleService],
	directives: [StockDetailsComponent],
	template: `
			<div *ngIf="stock"> <!-- stock won't be defined until the promise is over -->
				<my-stockDetails [stock]="stock"></my-stockDetails>
			</div>

			<!-- TODO: make a article-details or stock-articles-list component -->
			<div *ngIf="articles">
				<li *ngFor = "let article of articles">
					<a href="{{article.web_url}}">{{article.snippet}}</a>
				</li>
			</div>
		`
})

export class StockComponent implements OnInit, OnDestroy {
 	stock: Stock;
 	articles: NytArticle[];
 	sub : any;

 	constructor(
  		private stockService: StockService,
   		private route: ActivatedRoute,
   		private articleService: ArticleService) {}
 
 	ngOnInit() {
 		var self = this;
 		// http://localhost:3000/stock/AAPL => set stock based on symbol in route params
 	    self.sub = self.route.params.subscribe(params => {
	    	var symbol = params['symbol'];
      		self.stockService.getStock(symbol).then(stock => self.stock = stock)
      		.then(function(){
      			self.articleService.getArticles(self.stock).then(articles => self.articles = articles);
      		});
 	    });
 	}
 
 	ngOnDestroy() {
 		this.sub.unsubscribe();
 	}

}