import { Component, OnInit } from '@angular/core';
import { Item, StructuredData, InvalidItem } from '../types';
import { Observable, combineLatest } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-page0',
    templateUrl: './page0.component.html',
    styleUrls: ['./page0.component.css']
})
export class Page0Component implements OnInit {

    items: Observable<(Item | InvalidItem)[]>;
    form: FormGroup;
    mode: Mode = Mode.OFF;

    constructor(private dataService: DataService, private fb: FormBuilder) { }

    ngOnInit() {
        this.dataService.setupButtons(null, { update: false, text: 'Finish & Save', url: 'page1' });
        this.dataService.setValidity(false);
        this.items = this.dataService.getItems();
        this.form = this.fb.group({ comparator: new FormControl() });
        combineLatest(this.form.valueChanges, this.items).subscribe((structure: StructuredData) => {
            if (!this.mode) {
                this.mode = Mode.TABLE;
                this.dataService.setValidity(true);
            }
            this.dataService.updateStructure(structure);
        });
    }

    switchMode() {
        if (this.mode === 1) {
            this.mode = Mode.CHART;
        } else {
            this.mode = Mode.TABLE;
        }
    }
}

enum Mode {
    OFF = 0,
    TABLE = 1,
    CHART = 2
}