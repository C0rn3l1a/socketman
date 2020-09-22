import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { EditorView, keymap } from "@codemirror/next/view";
import { EditorState } from "@codemirror/next/state";
import { basicSetup } from "@codemirror/next/basic-setup";
import { defaultKeymap } from "@codemirror/next/commands";
import { oneDark } from "@codemirror/next/theme-one-dark";
import { defaultHighlighter } from "@codemirror/next/highlight";
import { javascript,  } from "@codemirror/next/lang-javascript";
import { CollectionService } from 'src/app/services/collection.service';
import { SocketEvent } from 'src/app/services/event.interface';
import { map } from 'rxjs/operators';
import { SocketService } from 'src/app/services/socket.service';
import { OSocket } from 'src/app/services/osocket.interface';


@Component({
    selector: 'event-editor',
    templateUrl: './event-editor.component.html',
    styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements AfterViewInit, OnInit {

    event: SocketEvent = {}
    open_sockets: OSocket[] = []
    client_codemirror: EditorView
    server_codemirror: EditorView
    extensions = [
        oneDark,
        basicSetup,
        defaultHighlighter,
        javascript({}),
        keymap(defaultKeymap)
    ]
    platform_list = [
        {tag:'socketio', label:'Socket.io'},
        {tag:'websocket', label:'Web Socket'},
        {tag:'httpevent', label:'Http Event'},
    ]

    @ViewChild('editor_client', {static: false, read: ElementRef}) editor_client: ElementRef
    @ViewChild('editor_server', {static: false, read: ElementRef}) editor_server: ElementRef

    constructor(private collection_service: CollectionService, private socket_service: SocketService) { }

    ngOnInit() {
        this.collection_service.active_event
            .pipe(map(event => {this.event = event; return event}))
            .subscribe(event => {
                this.client_codemirror.setState(EditorState.create({doc: event.data || '', extensions: this.extensions}))
            })

        this.socket_service.open_sockets.subscribe(open_sockets => this.open_sockets = open_sockets)
    }

    ngAfterViewInit(): void {
        let data = '';
        if(this.event) data = this.event.data || "";
        // Create codemirror instances
        let client_codemirror = new EditorView({ 
            state: EditorState.create({ 
                doc: data || '',
                extensions: this.extensions
            })
        });
        let server_codemirror = new EditorView({ 
            state: EditorState.create({ 
                doc: "",
                extensions: this.extensions
            })
        });
        // Get containers Sizes
        const editor_container_sizes_client = this.editor_client.nativeElement.getBoundingClientRect();
        const editor_container_sizes_serve = this.editor_server.nativeElement.getBoundingClientRect();
        // set client editor sizes
        // client_codemirror.dom.style.width = `${editor_container_sizes_client.width}px`;
        client_codemirror.dom.style.height = `${editor_container_sizes_client.height}px`;
        client_codemirror.dom.style.maxHeight = `${editor_container_sizes_client.height}px`;
        // set server editor sizes        
        // server_codemirror.dom.style.width = `${editor_container_sizes_serve.width}px`;
        server_codemirror.dom.style.height = `${editor_container_sizes_serve.height}px`;
        server_codemirror.dom.style.maxHeight = `${editor_container_sizes_serve.height}px`;
        // set codemirror instances in component properties
        this.client_codemirror = client_codemirror;
        this.server_codemirror = server_codemirror;
        // append editors to containers
        this.editor_client.nativeElement.appendChild(this.client_codemirror.dom);
        this.editor_server.nativeElement.appendChild(this.server_codemirror.dom);
    }

    get event_in_socket() {
        return this.open_sockets.map(socket => socket.host).includes(this.event.namespace);
    }

    send(event: SocketEvent) {
        this.socket_service.send(event.current_socket_identifier, event.data);
    }
    
    connect(event: SocketEvent) {
        let host = event.namespace;
        let socket: OSocket = this.socket_service.connect(host)
        this.event.current_socket_identifier = socket.identifier
        socket.subject.subscribe(
            data => this.listen_response(data),
            error => this.listen_error(error),
            () => this.listen_disconnect()
        );
    }

    listen_response(data) {
        this.server_codemirror.setState(EditorState.create({doc: JSON.stringify(data) || '', extensions: this.extensions}))
    }

    listen_error(error) {
        this.server_codemirror.setState(EditorState.create({doc: error || '', extensions: this.extensions}))
    }

    listen_disconnect() {

    }

}
