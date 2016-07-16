import { Component, Input, OnInit} from '@angular/core';
import { Stock} from '../models/stock';
import { ArticleService} from '../services/article.service';
import { NytArticle} from '../models/nyt-article';

// Component to display all news relating the inputted Stock
@Component({
	selector: 'my-stockNews',
	providers: [ArticleService],
	template: `
		<br><br>
		{{stock.name}} News
		<div *ngIf="articles">
			<li *ngFor = "let article of articles">
				<a href="{{article.web_url}}">{{article.snippet}}</a>
			</li>
		</div>
	`
})

export class StockNewsComponent implements OnInit{
	@Input()
	stock: Stock;
	articles: NytArticle[];

	constructor(
   		private articleService: ArticleService) {}

 	ngOnInit() {
		this.articleService.getArticles(this.stock).then(articles => this.articles = articles);
 	}
}