import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, delay, map, retryWhen, take, tap } from 'rxjs/operators';
import { OSocket } from './osocket.interface';

import {webSocket, WebSocketSubject} from 'rxjs/webSocket';


@Injectable({
    providedIn: 'root'
})
export class SocketService {
    
    open_sockets: BehaviorSubject<OSocket[]> = new BehaviorSubject([]); // Currently Open Sockets
    
    ws: WebSocketSubject<any>
    
    constructor() {}
    
    connect(namespace: string) {
        
        // TODO: Connect to real socket lol
        let socket_subject = webSocket('ws://localhost:8000');

        socket_subject.pipe(
            (errors => errors.pipe(
                tap(err => {
                    console.error('Got error', err);
                }),
                delay(1000)
            ))
        ).subscribe(
            msg => console.log('msg from server : ',msg),
            err => console.log('err from server : ',err),
            () => console.log('connection closed')
        )

        let socket: OSocket = {
            host: namespace,
            identifier: `${new Date().getTime()}`,
            subject: socket_subject
        };

        this.open_sockets.pipe(take(1)).subscribe(open_sockets => {
            this.open_sockets.next([...open_sockets, socket])
        })

        return socket
    }
    
    send(socket_identifier, data) {
        this.open_sockets.pipe(
            take(1), 
            map(open_sockets => open_sockets.find(ws => ws.identifier === socket_identifier))
        ).subscribe(socket => {
            if(socket) {
                socket.subject.next(data);
            }
        })
    }

    disconnect(socket_identifier) {
        this.open_sockets.pipe(take(1))
        .subscribe(open_sockets => {
            let index = open_sockets.findIndex(so => so.identifier === socket_identifier);
            if(index > -1) {
                let [socket] = open_sockets.splice(index, 1);
                socket.subject.complete();
                this.open_sockets.next(open_sockets);
            }
        })
    }
    
}
