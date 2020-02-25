import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-page1',
    templateUrl: './page1.component.html',
    styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

    constructor(public dataService: DataService) { }

    ngOnInit() {
        this.dataService.setupButtons({ update: false, text: 'Back', url: 'page0' }, null, { update: true, text: 'Finish & Save' });
    }

}
