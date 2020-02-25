import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Button } from '../types';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router) { }

    ngOnInit() {
    }
    action(button: Button) {
        if (button.update) {
            this.dataService.saveResult();
        } else if (button.url) {
            this.router.navigateByUrl(button.url);
        }
    }
}
