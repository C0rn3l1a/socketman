import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { ToastService } from './toast.service';

@Component({
    selector: 'ui-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
    constructor(private toast_service: ToastService) {}

    ngOnInit(): void {
        this.toast_service.notifications_subject
            .pipe(
                tap(notification => this.notifications.push(notification)),
                delay(1000)
            ).subscribe(notification => {
                let index = this.notifications.indexOf(notification);
                this.notifications.splice(index, 1);
            })
    }

    notifications = []

}
