import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    notifications_subject: Subject<any> = new Subject()
    
    constructor() { }


}
