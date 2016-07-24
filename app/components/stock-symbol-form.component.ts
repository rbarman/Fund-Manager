import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { StockService} from '../services/stock.service';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';

@Component({
	selector: 'my-symbolForm',
	providers: [StockService],
	directives: [MD_INPUT_DIRECTIVES,MD_BUTTON_DIRECTIVES],
	template: `
	  	<form (ngSubmit)="onSubmit()" #symbolForm="ngForm">
	        <!-- <label for="symbol">Track a new stock   </label> -->
			<md-input required placeholder="symbol" align="end" [(ngModel)]="symbol" name="symbol"> </md-input>
			<button md-raised-button color="primary" type="submit" [disabled]="!symbolForm.form.valid">Add</button>
		</form>
	`
})
export class StockSymbolFormComponent {
	symbol;

	constructor(
		private stockService: StockService){}

	onSubmit(){
		this.stockService.addStock(this.symbol);
		this.symbol = "";
	}

};