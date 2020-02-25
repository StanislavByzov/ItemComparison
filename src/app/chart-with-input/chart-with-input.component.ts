import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SimplifiedStructuredData, SimplifiedItem, SimplifiedIngredients, InvalidItem } from '../types';
import * as Highcharts from 'highcharts';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-chart-with-input',
    templateUrl: './chart-with-input.component.html',
    styleUrls: ['./chart-with-input.component.css']
})
export class ChartWithInputComponent implements OnInit {

    @Input()
    data: BehaviorSubject<SimplifiedStructuredData>;

    comparatorItem: SimplifiedItem;
    itemsToCompare: SimplifiedItem[];
    invalidItems: InvalidItem[];
    simplifiedIngredients: SimplifiedIngredients;
    ingredientsList: string[];

    Highcharts: typeof Highcharts = Highcharts; // required
    chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
    chartOptions: Highcharts.Options = null; // required
    updateFlag: boolean = false; // optional boolean
    oneToOneFlag: boolean = true; // optional boolean, defaults to false
    runOutsideAngularFlag: boolean = false; // optional boolean, defaults to false

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getData().subscribe((data: SimplifiedStructuredData) => {
            this.comparatorItem = data.comparatorItem;
            this.itemsToCompare = data.itemsToCompare;
            this.invalidItems = data.invalidItems;
            this.simplifiedIngredients = data.ingredients;
            this.ingredientsList = Object.keys(this.simplifiedIngredients);

            const series = [];
            const comparatorSerie = {
                name: "Comparator: " + this.comparatorItem.description,
                data: [],
                type: 'bar',
                color: 'rgb(185,216,249)',
                pointWidth: 30,
                showInLegend: true
            };
            for (let ingredient of this.ingredientsList) {
                const dataRecord = {
                    name: this.simplifiedIngredients[ingredient].description,
                    y: +this.simplifiedIngredients[ingredient].percentage || 0
                }
                comparatorSerie.data.push(dataRecord);
            }
            series.push(comparatorSerie);
            let i = 1;
            for (let item of this.itemsToCompare) {
                const serie = {
                    name: item.description,
                    data: [],
                    type: 'line',
                    colorIndex: ++i,
                    showInLegend: true
                };
                for (let ingredient of this.ingredientsList) {
                    const dataRecord = {
                        name: this.simplifiedIngredients[ingredient].description,
                        y: +item[ingredient] || 0
                    }
                    serie.data.push(dataRecord);
                }
                series.push(serie);
            }
            this.chartOptions = {
                title: {
                    text: undefined
                },
                xAxis: [{
                    reversed: true,
                    type: 'category',
                    labels: {
                        formatter() {
                            if (typeof (this.value) === 'string') {
                                return this.value
                            }
                        }
                    }
                }],
                yAxis: [{
                    tickInterval: 10,
                    min: 0,
                    max: 100,
                    labels: {
                        formatter: function () {
                            return this.value + ' ' + '%';
                        }
                    }
                }],
                legend: {
                    enabled: true,
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                },
                series: series
            }
        });
    }

}