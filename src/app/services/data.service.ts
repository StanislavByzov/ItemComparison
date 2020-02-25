import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Button, SimplifiedStructuredData, Item, InvalidItem, StructuredData, SimplifiedItem, SimplifiedIngredients, ComparatorID, Ingredient } from '../types';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    buttons: { back?: Button, next?: Button, update?: Button, valid: boolean } = { valid: true };
    data: BehaviorSubject<SimplifiedStructuredData> = new BehaviorSubject<SimplifiedStructuredData>(
        {
            comparatorItem: {
                id: '',
                description: ''
            },
            itemsToCompare: [],
            invalidItems: [],
            ingredients: {}
        });

    constructor(private http: HttpClient) { }

    saveResult() {
        this.exportAsPDF('pdf');
    }
    setupButtons(back: Button = null, next: Button = null, update: Button = null) {
        this.buttons = { back, next, update, valid: true };
    }
    setValidity(valid: boolean) {
        this.buttons.valid = valid;
    }
    getItems(): Observable<(Item | InvalidItem)[]> {
        let items$: Observable<(Item | InvalidItem)[]>;
        try {
            /* This is a dummy implementation */
            items$ = this.http.get<Item[]>("./assets/items.json");

            /* This is a real-world implementation. The project is passed as a source for IFrame, and the list of 
             * input items is available on the parent level as a global called "inputItems". Each input item is 
             * represented as an object like:
             * const realItem = {
             *   "filename": "inputItem1.json", // sometimes there are invalid (dummy) items with the filename "inputItem1.txt", which don't contain a valid json inside
             *   "title": "Input Item 1"
             *   "description": "description for item 1",
             *   "url": "https://host/items/itemfiles/inputItem1.json"
             * }; 
             */
            // let itemsBatch$: Observable<Item | InvalidItem>[] = [];
            // const items = parent["inputItems"];
            // for (let item of items) {
            //     if (item.filename.indexOf(".json") !== -1) {
            //         itemsBatch$.push(this.getItem(item.url));
            //     } else {
            //         itemsBatch$.push(of(new InvalidItem(item.title)));
            //     }
            // }
            // items$ = forkJoin(itemsBatch$);
        } catch (e) {
            throw Error(e);
        }
        return items$;
    }

    getItem(url): Observable<Item> {
        return this.http.get<Item>(url);
    }

    getData(): BehaviorSubject<SimplifiedStructuredData> {
        return this.data;
    }

    updateStructure(structure: StructuredData) {
        // Here we need at least 2 elements in the array - one of them is to represent the selected comparator, 
        // and another one is to represent the list of Items to compare with
        if (structure && structure.length > 1) {
            let simplifiedComparatorItem: SimplifiedItem;
            let simplifiedItemsToCompare: SimplifiedItem[] = [];
            let invalidItems: InvalidItem[] = [];
            let simplifiedIngredients: SimplifiedIngredients = {};
            const comparatorID = (structure[0] as ComparatorID).comparator;
            for (let item of (structure[1] as Array<Item | InvalidItem>)) {
                if (item instanceof InvalidItem) {
                    invalidItems.push(item);
                } else {
                    const simplifiedItem = {
                        id: item.id,
                        description: item.description
                    };
                    for (let ingredient of item.formula.formulaItem) {
                        simplifiedItem[ingredient.id] = ingredient.mass.percentage;
                    }
                    if (item.id === comparatorID) {
                        simplifiedComparatorItem = simplifiedItem;
                    } else {
                        simplifiedItemsToCompare.push(simplifiedItem);
                    }
                    const ingredients: Ingredient[] = item.formula && item.formula.formulaItem;
                    for (let ingredient of ingredients) {
                        if (!simplifiedIngredients[ingredient.id]) {
                            simplifiedIngredients[ingredient.id] = {
                                description: ingredient.description,
                                percentage: ingredient.mass.percentage
                            }
                        }
                    }
                }
                const simplifiedStructure: SimplifiedStructuredData = {
                    comparatorItem: simplifiedComparatorItem,
                    itemsToCompare: simplifiedItemsToCompare,
                    invalidItems: invalidItems,
                    ingredients: simplifiedIngredients
                };
                this.data.next(simplifiedStructure);
            }

        }
    }

    exportAsPDF(elementID) {
        let data = document.getElementById(elementID);
        html2canvas(data).then(canvas => {
            const contentDataURL = canvas.toDataURL('image/png');
            let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
            // let pdf = new jspdf('p', 'cm', 'a4'); // Generates PDF in portrait mode
            pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
            pdf.save('Filename.pdf');
        });
    }

}