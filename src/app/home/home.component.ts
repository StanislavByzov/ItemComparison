import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IframeMessagesService } from '../services/iframe-messages.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private dataService: DataService, private iframeService: IframeMessagesService) { }

    ngOnInit() {
        this.dataService.setupButtons();
        // The project is passed as a source for IFrame, and it can be run in several modes depending on the global parameter which is available 
        // on the parent level as a global called "targetPage". For demo purposes it's set to "page0" in 2 seconds
        // const targetPage = parent["targetPage"];
        setTimeout(() => {
            let targetPage = "page0";
            if (targetPage) {
                switch (targetPage) {
                    case "page0": {
                        this.iframeService.navigateTo("page0");
                        break;
                    }
                    case "review": {
                        this.iframeService.navigateTo("page1");
                        break;
                    }

                }
            }
        }, 2000);

    }

}
