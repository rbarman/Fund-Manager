import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NytArticle} from '../models/nyt-article';
import {nytApiKey} from '../api-keys';

@Injectable()
export class ArticleService {
	constructor(private http: Http) { }

	// uses new york times api
	getArticles(stock) {
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