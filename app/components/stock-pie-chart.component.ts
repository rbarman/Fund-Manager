import { Component, OnInit, Input} from '@angular/core';
import { Stock} from '../models/stock';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

@Component({
	selector: 'my-stockPieChart',
	directives: [CHART_DIRECTIVES,MD_CARD_DIRECTIVES],
	styles: [`
    	.chart {
      		display: block;
    	}`],
	template: `
		<md-card>
		Price Weight
			<base-chart class="chart"
		        [data]="chartData"
		        [labels]="chartLabels"
		        [chartType]="chartType"
		        (chartHover)="chartHovered($event)"
		        (chartClick)="chartClicked($event)">
	        </base-chart>
        </md-card>
	`
})

export class StockPieChartComponent implements OnInit {
	@Input()
	stocks : Stock[];

	chartLabels:string[];
	chartData:number[];
	// TODO: add custom colors based on company?
	chartType:string = 'pie';

	chartHovered(e){
		// console.log(e);
	}

	chartClicked(e){
		// console.log(e);
	}

	getChartLabels() {
		var array : string[] = [];
		this.stocks.forEach(function(stock){
			array.push(stock.symbol);
		})
		return array;
	}

	getChartData() {
		var array : number[] = [];
		this.stocks.forEach(function(stock){
			array.push(stock.price);
		})
		return array;
	}

	// TODO: ngOnInit is not dynamic -> does not update on Input
	ngOnInit() {
		this.chartLabels = this.getChartLabels();
	 	this.chartData = this.getChartData();
	}

}