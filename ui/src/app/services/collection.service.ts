import { Injectable } from '@angular/core';
import { of, ReplaySubject, BehaviorSubject } from 'rxjs';
import { SocketEvent } from './event.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

    active_event: ReplaySubject<SocketEvent> = new ReplaySubject(); // the selected tab
    open_events: BehaviorSubject<SocketEvent[]> = new BehaviorSubject([]); // list of event shown as tabs

    constructor() { }

    get_collections() {
        return of(
            [
                {
                    title: "Coleccion 1",
                    events: [
                        {
                            title: "hello world",
                            type: "emit",
                            data: '{"serialized":"JSON"}',
                            namespace: "https://localhost:8000/"
                        },
                        {
                            title: "listen salutation",
                            type: "listen",
                            namespace: "https://localhost:8000/"
                        }
                    ]
                },
                {
                    title: "Coleccion 2",
                    events: [
                        {
                            title: "other",
                            type: "emit",
                            namespace: "https://localhost:3000/"
                        }
                    ]
                },
                {
                    title: "Coleccion 3",
                    events: [
                        {
                            title: "other",
                            type: "emit",
                            namespace: "https://localhost:5000/"
                        }
                    ]
                },
                {
                    title: "Coleccion 4",
                    events: [
                        {
                            title: "other",
                            type: "emit",
                            namespace: "https://somesocket.com/"
                        }
                    ]
                },
            ]
        );
    }
}
