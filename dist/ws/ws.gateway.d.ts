import { Server, Socket } from 'socket.io';
export declare class WsGateway {
    private clients;
    server: Server;
    afterInit(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    emitMessage(data: string): Promise<void>;
}
