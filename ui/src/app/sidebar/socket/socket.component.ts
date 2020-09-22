import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { OSocket } from 'src/app/services/osocket.interface';
import { SocketService } from 'src/app/services/socket.service';

@Component({
    selector: 'sockets',
    templateUrl: './socket.component.html',
    styleUrls: ['./socket.component.scss']
})
export class SocketComponent implements OnInit {

    socket_list: any[] = []

    constructor(private socket_service: SocketService) { }

    ngOnInit(): void {
        this.socket_service.open_sockets
            .pipe(map((socket_list: any) => socket_list.map(socket => {socket.detail = false; return socket})))
            .subscribe(socket_list => this.socket_list = socket_list)
    }

    disconnect(socket: OSocket) {

    }

}
