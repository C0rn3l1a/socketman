import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
import { map, take } from "rxjs/operators";
import { ReplaySubject } from 'rxjs';
import { SocketEvent } from 'src/app/services/event.interface';

@Component({
    selector: 'collections',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

    collection_list = [];

    constructor(private _collection_service: CollectionService) { }

    ngOnInit(): void {
        // load all collections to a list
        this._collection_service.get_collections().pipe(map((collections: any) => {
            return collections.map(collection => {collection.open = false; return collection}); // here we add a flag for navigations (open/close)
        })).subscribe(collections => {
            this.collection_list = collections; 
        });
    }

    open_event(event: SocketEvent) {
        // take the event and add it to the list
        this._collection_service.open_events.pipe(take(1)).subscribe((current_events = []) => {
            if(current_events.includes(event)) {
                this._collection_service.active_event.next(event);
            } else {
                this._collection_service.open_events.next([...current_events, event]);
                this._collection_service.active_event.next(event);
            }
        });
    }
    
}
