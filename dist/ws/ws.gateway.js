"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let WsGateway = class WsGateway {
    clients = new Map();
    server;
    afterInit() {
        console.assert('Gateway WS Running');
    }
    async handleConnection(client) {
        const type = client.handshake.query.type;
        const obj = this.clients.get(type);
        if (obj) {
            obj.push(client.id);
            return;
        }
        this.clients.set(type, [client.id]);
        return;
    }
    async handleDisconnect(client) {
        const type = client.handshake.query.type;
        const obj = this.clients.get(type);
        if (!obj) {
            return;
        }
        obj.splice(obj.indexOf(client.id), 1);
        return;
    }
    async emitMessage(data) {
        if (data === 'ping') {
            this.clients.get('pong')?.forEach((clientId) => {
                this.server.to(clientId).emit('pong', 'Pong!');
            });
            return;
        }
        this.clients.get('ping')?.forEach((clientId) => {
            this.server.to(clientId).emit('ping', 'Ping!');
        });
    }
};
exports.WsGateway = WsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping-pong'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WsGateway.prototype, "emitMessage", null);
exports.WsGateway = WsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
            transports: ['websocket', 'polling'],
        },
        allowEIO3: true,
    })
], WsGateway);
//# sourceMappingURL=ws.gateway.js.map