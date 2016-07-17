import { Component, Input, OnInit} from '@angular/core';
import { Stock} from '../models/stock';
import { ArticleService} from '../services/article.service';
import { YfArticle} from '../models/yf-article';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {StockArticleComponent} from './stock-article.component';

// Component to display all news relating the inputted Stock
@Component({
	selector: 'my-stockNews',
	providers: [ArticleService],
	directives: [MD_CARD_DIRECTIVES,MD_LIST_DIRECTIVES,StockArticleComponent],
	template: `
		<br><br>
		<md-card>
			{{stock.name}} News
			<md-list *ngIf="articles">
				<md-list-item *ngFor = "let article of articles">
					<my-stockArticle [article]="article"></my-stockArticle>
				</md-list-item> 
			</md-list>
		</md-card>
	`
})

export class StockNewsComponent implements OnInit{
	@Input()
	stock: Stock;
	articles: YfArticle[];

	constructor(
   		private articleService: ArticleService) {}

 	ngOnInit() {
		this.articleService.getYfArticles(this.stock).then(articles => this.articles = articles);
		// this.articleService.getYfArticles(this.stock);
 	}
}