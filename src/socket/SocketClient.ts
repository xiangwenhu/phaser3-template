import { ManagerOptions, SocketOptions, io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '_socket.io-client@4.0.0@socket.io-client/build/typed-events';


export default class SocketClient {

    private socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    private uri: string;
    private opts?: Partial<ManagerOptions & SocketOptions>

    constructor(uri: string, opts?: Partial<ManagerOptions & SocketOptions>) {
        this.uri = uri;
        this.opts = opts;
        this.socket = io(this.uri, this.opts);
    }

    on(ev: string, listener: (...args: any[]) => void) {        
        this.socket.on(ev, listener);
    }

    off(ev: string, listener: (...args: any[]) => void) {
        this.socket.off(ev, listener);
    }       

}


