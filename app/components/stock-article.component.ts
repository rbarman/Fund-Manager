import { Component, Input} from '@angular/core';
import { YfArticle} from '../models/yf-article';

// component to dispay YfArticles
@Component({
	selector: 'my-stockArticle',
	template: `
		<a href="{{article.link}}">{{article.title}}</a> 
	`
})

export class StockArticleComponent{
	@Input()
	article: YfArticle;
}