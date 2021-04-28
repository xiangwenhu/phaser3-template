import { ManagerOptions, SocketOptions } from "socket.io-client";
import SocketClient from "./SocketClient";

export default function getClient(uri: string, opts?: Partial<ManagerOptions & SocketOptions>) {
    return new SocketClient(uri, opts);
}
