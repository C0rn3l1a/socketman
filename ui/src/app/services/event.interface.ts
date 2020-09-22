export interface SocketEvent {
    title?: string
    type?: 'emit' | 'listen'
    data?: string
    namespace?: string
    platform?: string
    current_socket_identifier?: string
}