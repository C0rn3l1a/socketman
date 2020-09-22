import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
    
    open_events = this.collection_service.open_events
    active_event = this.collection_service.active_event

    constructor(private collection_service: CollectionService) {
        this.collection_service.open_events.subscribe(open_events => {
            console.log('open_events : ',open_events)
        })
    }

    ngOnInit(): void {
    }

    select_event(event) {
        this.active_event.next(event)
    }

}
