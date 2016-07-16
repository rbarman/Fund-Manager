import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NytArticle} from '../models/nyt-article';
import { YfArticle} from '../models/yf-article';
import {nytApiKey} from '../api-keys';

@Injectable()
export class ArticleService {
	constructor(private http: Http) { }

	// get yahoo finance articles based on the stock
	getYfArticles(stock){
		var url = 'https://crossorigin.me/http://finance.yahoo.com/rss/headline?s='+ stock.symbol;
		return this.http.get(url).toPromise().then(function(data){
			var xmlString = data.text(); // api returns xml.
			// converting the xmlString to a DOM object. Unable to find good xml to json libraries
			var oDOM = new DOMParser().parseFromString(xmlString, "text/xml");
			// article objects are under the item tag. 
			var articles = oDOM.getElementsByTagName('item');
			var yfArticles : YfArticle[] = [];

			// Add each article. 
			// Since each article is a dom element, need find element by tag and get textContent
			for(var i = 0; i < articles.length; i++) {
				var article = articles[i];
				yfArticles.push({
					title: article.getElementsByTagName('title')[0].textContent,
					link: article.getElementsByTagName('link')[0].textContent,
					description: article.getElementsByTagName('description')[0].textContent,
					pubDate: article.getElementsByTagName('pubDate')[0].textContent
				});
			}
			return yfArticles;
		});
	}

	// uses new york times api
	getNytArticles(stock) {
		// Building the GET url.
		// https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key={nytApiKey}&q=apple company
		var proxy = "https://crossorigin.me/";
		var apiKey = nytApiKey;
		var apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + apiKey + '&q=' + stock.name;
 		var url = proxy + apiUrl;

		// GET url built, now make http.get call
 		return this.http.get(url).toPromise().then(function(data){
 			var json = data.json();
 			var nytArticles : NytArticle[] = [];
 			for(var i = 0; i < json.response.docs.length; i++) {
 				var article = json.response.docs[i];
 				// create a news obj
 				nytArticles.push({
 					web_url : article.web_url,
 					snippet : article.snippet 
 				})
 			}
 			// return array of all the news, similar to getStoks
 			return nytArticles;
 		});
	}
}