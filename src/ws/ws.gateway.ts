import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
    transports: ['websocket', 'polling'],
  },
  allowEIO3: true,
})
export class WsGateway {

  private clients: Map<string, string[]> = new Map();

  @WebSocketServer() server: Server;

  afterInit() {
    console.assert('Gateway WS Running');
  }

  async handleConnection(client: Socket) {
    const type = client.handshake.query.type as PingPong;
    const obj = this.clients.get(type)
    if (obj) {
      obj.push(client.id);
      return
    }

    this.clients.set(type, [client.id]);
    return
  }

  async handleDisconnect(client: Socket) {
    const type = client.handshake.query.type as PingPong;
    const obj = this.clients.get(type);
    if (!obj) {
      return
    }
    obj.splice(obj.indexOf(client.id), 1);
    return
  }

  @SubscribeMessage('ping-pong')
  async emitMessage(@MessageBody() data: string) {
    if (data === 'ping') {
      this.clients.get('pong')?.forEach((clientId) => {
        this.server.to(clientId).emit('pong', 'Pong!');
      });
      return
    }

    this.clients.get('ping')?.forEach((clientId) => {
      this.server.to(clientId).emit('ping', 'Ping!');
    });

  }

}

type PingPong = 'ping' | 'pong';