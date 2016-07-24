import { Component, Input, OnChanges} from '@angular/core';
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

export class StockPieChartComponent implements OnChanges {
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

	setLabelsAndData(){
		// labels will be stock symbols and data will be stock price
		this.chartLabels = this.stocks.map(function(stock) {return stock.symbol;});
		this.chartData = this.stocks.map(function(stock) {return stock.price;});
	}

	ngOnChanges(change) {
		// update the labels every time the @input,stocks, changes
		this.setLabelsAndData();
	}
}