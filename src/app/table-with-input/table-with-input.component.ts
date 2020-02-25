import { Component, OnInit, Input } from '@angular/core';

import { SimplifiedStructuredData, SimplifiedItem, SimplifiedIngredients, InvalidItem } from '../types';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-table-with-input',
    templateUrl: './table-with-input.component.html',
    styleUrls: ['./table-with-input.component.css']
})
export class TableWithInputComponent implements OnInit {

    @Input()
    data: BehaviorSubject<SimplifiedStructuredData>;

    comparatorItem: SimplifiedItem;
    itemsToCompare: SimplifiedItem[];
    invalidItems: InvalidItem[];
    simplifiedIngredients: SimplifiedIngredients;
    ingredientsList: string[];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getData().subscribe((data: SimplifiedStructuredData) => {
            this.comparatorItem = data.comparatorItem;
            this.itemsToCompare = data.itemsToCompare;
            this.invalidItems = data.invalidItems;
            this.simplifiedIngredients = data.ingredients;
            this.ingredientsList = Object.keys(this.simplifiedIngredients);
        });
    }

}
