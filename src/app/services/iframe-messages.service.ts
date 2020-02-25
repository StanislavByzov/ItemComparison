import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class IframeMessagesService {
    constructor(private router: Router) {

    }

    sendOut(message, data?) {
        console.log('sending message outside', message);
        parent.postMessage(message, '*');
    }

    navigateTo(page) {
        this.router.navigateByUrl(page);
    }

}
