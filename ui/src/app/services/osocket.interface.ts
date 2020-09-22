import { WebSocketSubject } from 'rxjs/webSocket';

export interface OSocket {
    host?: string,
    identifier?: string
    subject?: WebSocketSubject<unknown>
}